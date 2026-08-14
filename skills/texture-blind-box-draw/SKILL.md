---
name: texture-blind-box-draw
description: Use when Codex needs to edit or prompt-edit a user-uploaded real photo with localized blind-box style black-line doodles that follow existing cracks, scratches, object contours, color blocks, or empty corners while preserving at least 70% of the original photo. Trigger for requests about 局部简笔涂鸦, 纹理顺势, 盲盒创意绘画, object anthropomorphism, micro-world corner doodles, or photo inpainting that must avoid full-image illustration, anime restyling, object replacement, or major scene changes.
---

# Texture Blind Box Draw

## Overview

Transform a real user-supplied photo by adding small black-line doodles that look discovered inside the original scene. Preserve the photograph as the base image, keep original subjects, lighting, texture, noise, and material intact, and only add localized doodle details.

Use image editing or local inpainting tools only after a source image exists. Do not use this skill to generate a new image from text alone.

## Core Rules

- Preserve at least 70% of the original real-photo information in every output.
- Keep original composition, camera angle, lighting, noise, grain, color, material, and core object shapes unchanged.
- Add only small black thin-line doodles, as if drawn with a marker on the photographed surface.
- Treat doodles as secondary details; never let them take over the subject or visual center.
- Default to intensity level 2. Automatically stay within levels 1-4. Use level 5 only after explicit user confirmation.
- Use the prompt fragments in [mode-prompts.json](references/mode-prompts.json) when composing an edit prompt.

## Workflow

1. Verify that the user supplied a real source image. If no image is present, ask for one.
2. Analyze the photo for: native cracks, scratches, seams, object contours, anthropomorphic objects, color blocks, and unused corners.
3. Apply any user override first. If no override exists, select the strongest matching mode:
   - `CrackTrace`: use when cracks, scratches, seams, or broken lines can become character contours.
   - `ObjectAnthropo`: use when food, stones, fruit, tools, or other objects can receive tiny facial features while keeping their shape unchanged.
   - `MicroWorld`: use when corners, edges, gaps, or blank space can hold very small people or props.
   - `SymbolDecorate`: use when the user asks for no living characters, more restraint, or decorative atmosphere only.
   - `CustomFree`: use when the user specifies a custom doodle idea; still enforce every preservation rule.
4. Choose an intensity:
   - Level 1: no more than 5% doodle coverage, 1-2 tiny details.
   - Level 2: 5-15% coverage, default, light and natural.
   - Level 3: 15-25% coverage, more story and multiple doodles.
   - Level 4: 25-30% coverage, busy but still subordinate to the photo.
   - Level 5: exactly up to 30% coverage and only after explicit user confirmation.
5. Compose the edit prompt by joining the global positive fragment, the selected mode fragment, any user-specific creative request, and the global negative fragment.
6. Run the image edit or provide the composed prompt, depending on the available tools and the user's request.
7. Briefly tell the user which mode and intensity were used, and invite only practical follow-up adjustments such as stronger, lighter, different mode, or specific doodle content.

## Forbidden Output

Set `forbidden_trigger=true` or refuse the specific edit when the user asks to:

- Convert the whole photo into an illustration, anime image, painting, or fully redrawn style.
- Change the main object's shape, material, color, identity, or position.
- Replace original objects or generate a new scene.
- Remove photographic noise, stains, scratches, blemishes, dust, or other real-photo traces.
- Add large characters, thick paint, color-heavy doodles, 3D render elements, or anything covering more than 30% of the image.

If the user insists on crossing these limits, say: "该 Skill 定位是原图局部增量涂鸦，不支持全盘重绘。如果需要完整插画效果，请使用普通 AI 图像生成。"

## Response Shape

When returning structured planning output, use:

```json
{
  "active_mode": "ObjectAnthropo",
  "intensity_level": 2,
  "analysis_note": "Short description of usable photo features.",
  "prompt_set": {
    "positive": "Global positive prompt plus mode prompt plus user-specific instruction.",
    "negative": "Global negative prompt."
  },
  "suggest_user_msg": "Short natural-language explanation for the user.",
  "forbidden_trigger": false
}
```

Use [function-schema.json](references/function-schema.json) only when a function/tool schema is needed. Use [example-output.json](examples/example-output.json) as a compact output example.
