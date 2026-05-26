#!/usr/bin/env python3
"""
claude-cached.py — Anthropic SDK wrapper with prompt caching
Replaces: claude -p "$PROMPT" --model $MODEL
Usage: echo "prompt" | python3 /root/scripts/claude-cached.py --model MODEL

Cost reduction:
  - Prompt caching: 90% discount on cached SKILL.md tokens (after first call)
  - Automatic: any prompt block >1024 tokens gets cache_control
"""

import sys
import os
import argparse
import anthropic

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--model', default='claude-haiku-4-5-20251001')
    parser.add_argument('--agent', default='')
    parser.add_argument('--max-tokens', type=int, default=8096)
    parser.add_argument('prompt', nargs='?', default=None)
    args = parser.parse_args()

    if args.prompt:
        prompt_text = args.prompt
    else:
        prompt_text = sys.stdin.read()

    if not prompt_text.strip():
        print('Error: empty prompt', file=sys.stderr)
        sys.exit(1)

    api_key = os.environ.get('ANTHROPIC_API_KEY', '')
    if not api_key:
        print('Error: ANTHROPIC_API_KEY not set', file=sys.stderr)
        sys.exit(2)

    client = anthropic.Anthropic(api_key=api_key)

    CACHE_THRESHOLD = 1024

    if len(prompt_text) > CACHE_THRESHOLD * 2:
        split_point = int(len(prompt_text) * 0.65)
        boundary = prompt_text.rfind('\n---\n', 0, split_point)
        if boundary == -1:
            boundary = prompt_text.rfind('\n\n', 0, split_point)
        if boundary == -1:
            boundary = split_point

        system_part = prompt_text[:boundary].strip()
        user_part = prompt_text[boundary:].strip()

        system_blocks = [{
            'type': 'text',
            'text': system_part,
            'cache_control': {'type': 'ephemeral'}
        }]
        messages = [{'role': 'user', 'content': user_part}]
    else:
        system_blocks = []
        messages = [{'role': 'user', 'content': prompt_text}]

    try:
        kwargs = {
            'model': args.model,
            'max_tokens': args.max_tokens,
            'messages': messages,
        }
        if system_blocks:
            kwargs['system'] = system_blocks
            kwargs['betas'] = ['prompt-caching-2024-07-31']

        response = client.messages.create(**kwargs)

        usage = response.usage
        cache_read = getattr(usage, 'cache_read_input_tokens', 0) or 0
        cache_write = getattr(usage, 'cache_creation_input_tokens', 0) or 0
        total_in = getattr(usage, 'input_tokens', 0) or 0
        total_out = getattr(usage, 'output_tokens', 0) or 0

        if cache_read > 0 or cache_write > 0:
            savings_pct = round(cache_read / max(1, total_in + cache_read) * 100)
            print(f'[CACHE] read={cache_read} write={cache_write} input={total_in} output={total_out} savings={savings_pct}%', file=sys.stderr)
        else:
            print(f'[TOKENS] input={total_in} output={total_out}', file=sys.stderr)

        for block in response.content:
            if block.type == 'text':
                print(block.text)

    except anthropic.AuthenticationError as e:
        print(f'Auth error: {e}', file=sys.stderr)
        sys.exit(2)
    except anthropic.RateLimitError as e:
        print(f'Rate limit: {e}', file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
