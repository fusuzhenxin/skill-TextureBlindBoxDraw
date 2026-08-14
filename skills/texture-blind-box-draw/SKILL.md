---
name: texture-blind-box-draw
description: Use when Codex needs to edit or prompt-edit a user-uploaded real photo with localized blind-box style black-line doodles that discover one hidden micro-event from existing cracks, scratches, shadows, reflections, stains, object contours, color blocks, or empty corners while preserving at least 70% of the original photo. Trigger for requests about 局部简笔涂鸦, 纹理顺势, 盲盒创意绘画, hidden scenes, object anthropomorphism, micro-world corner doodles, or photo inpainting that must avoid full-image illustration, anime restyling, object replacement, or major scene changes.
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
- Create one coherent hidden event per image, not a random collection of stickers.
- Anchor the event to one visible photo clue and explain the clue in the analysis.
- Make the event discoverable on a second look: use scale, partial occlusion, continuation of a line, or a tiny prop instead of a large character.
- Prefer action and relationships over isolated facial features. A face may be an accent, never the whole idea.
- Use one primary character or 1-3 tiny participants. Avoid crowd scenes unless the user explicitly asks for them.
- Default to intensity level 2. Automatically stay within levels 1-4. Use level 5 only after explicit user confirmation.
- Use the prompt fragments in [mode-prompts.json](references/mode-prompts.json) and the event library in [creative-hooks.json](references/creative-hooks.json) when composing an edit prompt.

## Hidden Event Engine

Build the creative idea in this order:

1. **Photo clue**: identify one native visual feature such as a crack, shadow, reflection, stain, fold, wood grain, wire, steam trail, food arrangement, or empty gap.
2. **Event**: decide what tiny thing is happening there. Prefer a verb: repairing, mapping, climbing, delivering, hiding, waiting, excavating, performing, guarding, or escaping.
3. **Relationship**: connect the tiny event to the photographed object or surface. The doodle must look caused by, supported by, or constrained by the real feature.
4. **Reveal point**: add one tiny clue that makes the scene rewarding to inspect, such as a route line, tool, footprint, sign, shadow mismatch, miniature door, or unfinished task.
5. **Theme**: choose a quiet emotional direction such as healing daily life, urban archaeology, micro-adventure, absurd humor, mystery discovery, hidden fairy tale, or minimal art.

Do not expose every idea equally. Let the main event be readable, while one supporting clue remains subtle.

## Workflow

1. Verify that the user supplied a real source image. If no image is present, ask for one.
2. Analyze the photo for: native cracks, scratches, seams, shadows, reflections, stains, folds, wood grain, steam, wires, object contours, anthropomorphic objects, color blocks, and unused corners. Record the strongest visual clue.
3. Apply any user override first. If no override exists, select the strongest matching mode:
   - `CrackTrace`: use when cracks, scratches, seams, or broken lines can become character contours.
   - `ObjectAnthropo`: use when food, stones, fruit, tools, or other objects can receive tiny facial features while keeping their shape unchanged.
   - `MicroWorld`: use when corners, edges, gaps, or blank space can hold very small people or props.
   - `SymbolDecorate`: use when the user asks for no living characters, more restraint, or decorative atmosphere only.
   - `CustomFree`: use when the user specifies a custom doodle idea; still enforce every preservation rule.
4. Choose one theme and one hidden event. If the user did not specify a theme, select the theme that best matches the photo's mood. Generate one primary action and at most two supporting micro-details.
5. Choose an intensity:
   - Level 1: no more than 5% doodle coverage, 1-2 tiny details.
   - Level 2: 5-15% coverage, default, light and natural.
   - Level 3: 15-25% coverage, more story and multiple doodles.
   - Level 4: 25-30% coverage, busy but still subordinate to the photo.
   - Level 5: exactly up to 30% coverage and only after explicit user confirmation.
6. Compose the edit prompt by joining the global positive fragment, the selected mode fragment, the hidden-event instruction, the theme, any user-specific creative request, and the global negative fragment.
7. Run the image edit or provide the composed prompt, depending on the available tools and the user's request.
8. Briefly tell the user which mode, theme, and intensity were used, and describe the hidden event without over-explaining every visual secret.

## Creative Quality Check

Before finalizing, verify:

- The event could not exist without the chosen photo clue.
- The event has an action, not only a face or decorative icon.
- The original subject remains the visual anchor.
- The first glance reads as a real photo; the second glance reveals the event.
- The added linework has a consistent scale, stroke weight, and black-marker language.
- The event is specific enough to feel authored, but small enough to feel discovered.

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
  "creative_theme": "micro-adventure",
  "hidden_event": "Tiny climbers are using a food texture as a mountain route.",
  "texture_evidence": "The folded surface and a dark edge create a natural climbing path.",
  "character_relation": "The characters follow and depend on the photographed texture.",
  "reveal_point": "A tiny flag and unfinished rope appear only near the edge of the texture.",
  "prompt_set": {
    "positive": "Global positive prompt plus mode prompt plus user-specific instruction.",
    "negative": "Global negative prompt."
  },
  "suggest_user_msg": "Short natural-language explanation for the user.",
  "forbidden_trigger": false
}
```

Use [function-schema.json](references/function-schema.json) only when a function/tool schema is needed. Use [example-output.json](examples/example-output.json) as a compact output example.
