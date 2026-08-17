---
name: texture-blind-box-draw
description: Use when Codex needs to visibly transform a user-uploaded real photo with an obvious, surprising, localized blind-box doodle event built from existing cracks, shadows, reflections, stains, object contours, color blocks, or negative space while preserving at least 70% of the original photo. Trigger for 局部简笔涂鸦, 纹理顺势, 盲盒创意绘画, hidden scenes, object anthropomorphism, micro-world photo edits, or image inpainting that should feel clearly different from the source without becoming a full illustration, anime restyle, object replacement, or barely visible annotation.
---

# Texture Blind Box Draw

## Goal

Turn a real user photo into an unmistakably more imaginative image. Preserve the photograph as the base, but make the added event obvious enough that the edited result never feels unchanged.

Use image editing or local inpainting only after a source image exists. Do not generate a replacement scene from text alone.

## Core Rules

- Preserve at least 70% of the original photographic information, including composition, camera angle, lighting, grain, material, and core object shapes.
- Create a visible creative transformation, not a timid annotation. At 512px wide, a viewer must notice the changed region within 1 second and understand the event or visual joke within about 3 seconds.
- Preserve the photo globally and edit locally. Keep the actual linework sparse, but let the event's visual footprint occupy roughly 15-30% of the frame by using real objects and textures as part of the event.
- Use black marker linework as the primary visual language. On a busy or dark surface, permit a narrow white separation edge or one source-sampled accent on a single small prop; keep accent fill below 3% of the frame.
- Build one focal event plus 1-2 supporting clues. Keep them compositionally connected instead of scattering unrelated doodles.
- Borrow at least two native photo features. The event must depend on both, so it cannot be pasted unchanged onto another image.
- Make the real photo provide most of the character, stage, or prop. Add only the lines needed to complete the alternate reading.
- Prefer semantic transformation and visual punchlines over generic miniature activity. Ask what the texture can be mistaken for, then reveal that alternate identity.
- Physically integrate every character: make it stand on an edge, follow perspective, hold a native line, react to wind or water, or become partially occluded by a real object.
- Reject bare arrows, isolated stick figures, smiley faces, generic climbing routes, flags as the only payoff, and long ropes across empty space. These are annotations, not finished ideas.
- Default to intensity 3, visibility 4, and surprise 4. Reduce them only when the user explicitly asks for subtlety.
- For a 1024px image at visibility 4, make the primary event cluster about 180-320px on its longest side with a 5-8px main stroke. Scale proportionally for other sizes.
- Use [mode-prompts.json](references/mode-prompts.json) to compose edit prompts and [creative-hooks.json](references/creative-hooks.json) to avoid repeated ideas.

## Surprise Engine

Build the concept in this order:

1. **Two source clues**: select two visually connected native features, such as a leaf plus ripple, food curve plus crumbs, shadow plus doorway, or steam plus cup rim.
2. **Alternate reading**: decide what those features could become together. Let the photo supply most of the illusion.
3. **Visual punchline**: add a specific turn, consequence, failure, misunderstanding, rescue, exchange, or impossible task. Do not stop at "tiny people are here."
4. **Physical integration**: make poses, tools, occlusion, scale, and direction obey the photographed surface.
5. **Composition**: create one clear focal cluster and a smaller echo clue that leads the eye back to it.
6. **Reveal**: keep one rewarding detail for closer inspection without hiding the main event.

Target a semantic transformation: the first glance notices the edit, while the second glance realizes why that edit could only happen in this particular photo.

## Creative Ladder

- Level 1 - decoration: random symbols or faces. Reject.
- Level 2 - annotation: arrows, labels, or floating stick figures. Reject.
- Level 3 - micro-scene: a readable action connected to the photo. Minimum acceptable result.
- Level 4 - semantic surprise: native photo features become essential characters, props, or consequences. Default target.
- Level 5 - full restyle: the photo becomes an illustration. Reject.

## Workflow

1. Verify that the user supplied a real source photo. If not, ask for one.
2. Identify 3-5 useful native clues, then choose the strongest connected pair.
3. Apply a user override when present. Otherwise select:
   - `CrackTrace` for cracks, scratches, seams, and broken lines.
   - `ObjectAnthropo` for food, stones, fruit, tools, and shaped objects.
   - `MicroWorld` for edges, gaps, surfaces, and negative space that can support a clear event.
   - `SymbolDecorate` only when the user explicitly requests no living characters.
   - `CustomFree` when the user provides a specific idea.
4. Generate three short candidate concepts with different surprise mechanics. Reject any concept that could move unchanged to an unrelated photo. Select the strongest remaining one.
5. Use surprise level 4 by default. Make the source clues carry the premise and add one clear visual punchline.
6. Use visibility level 4 by default:
   - Level 1: barely visible; explicit user request only.
   - Level 2: subtle; clean, bright backgrounds only.
   - Level 3: readable, with a 130-220px main cluster at 1024px.
   - Level 4: obvious but local, with a 180-320px main cluster at 1024px.
   - Level 5: bold, with a 260-380px main cluster; require explicit confirmation.
7. Use intensity level 3 by default:
   - Level 1: under 8% visual footprint, one restrained detail.
   - Level 2: 8-15% visual footprint, one simple event.
   - Level 3: 15-25% visual footprint, one focal event plus supporting evidence.
   - Level 4: 25-30% visual footprint, stronger staging while the photo remains dominant.
   - Level 5: exactly up to 30%; require explicit confirmation.
8. Compose the edit prompt from the global prompt, selected mode, surprise instruction, visibility instruction, source clues, visual punchline, and negative prompt.
9. Edit only the planned regions. Do not redraw untouched parts of the source.
10. Run the quality gate. If it fails, redesign the concept before returning the image.

## Quality Gate

Score each category from 0-2. Require at least 8/10 and no zero:

- **Source preservation**: the result remains recognizably the same photograph.
- **Visible difference**: the edit is immediately noticeable at 512px.
- **Texture dependence**: at least two native features are essential to the idea.
- **Physical integration**: linework obeys surfaces, perspective, occlusion, and visual weight.
- **Surprise**: the event contains a specific visual turn rather than a generic activity.

Also reject and revise when:

- The main event disappears at thumbnail size.
- Removing the photo background would leave a complete, generic doodle scene.
- The idea is only a character standing, climbing, pointing, pulling a rope, or planting a flag.
- A straight arrow or line becomes the most visible added element.
- The output redraws the whole photo, changes the main object's identity, or turns the source into an illustration.

## Forbidden Output

Set `forbidden_trigger=true` or refuse the specific edit when the user asks to:

- Convert the whole photo into an illustration, anime image, painting, or fully redrawn style.
- Change the main object's shape, material, color, identity, or position.
- Replace original objects or generate a new scene.
- Remove photographic noise, stains, scratches, blemishes, dust, or other source traces.
- Cover more than 30% of the frame with newly generated opaque artwork.

If the user insists on crossing these limits, say: "该 Skill 定位是保留原图的局部创意改造，不支持全盘重绘。如果需要完整插画效果，请使用普通 AI 图像生成。"

## Response Shape

When returning structured planning output, use:

```json
{
  "active_mode": "ObjectAnthropo",
  "intensity_level": 3,
  "visibility_level": 4,
  "surprise_level": 4,
  "analysis_note": "Short description of usable photo features.",
  "source_clues": ["First native feature", "Second native feature"],
  "creative_theme": "absurd-humor",
  "hidden_event": "A specific localized event.",
  "visual_punchline": "The alternate reading or surprising consequence.",
  "texture_evidence": "Why the event depends on this exact photograph.",
  "character_relation": "How the added figures physically interact with the source.",
  "reveal_point": "One smaller supporting clue.",
  "difference_note": "Why the result is visibly different at thumbnail size.",
  "quality_score": {
    "source_preservation": 2,
    "visible_difference": 2,
    "texture_dependence": 2,
    "physical_integration": 2,
    "surprise": 2,
    "total": 10
  },
  "prompt_set": {
    "positive": "Complete local edit prompt.",
    "negative": "Global negative prompt."
  },
  "suggest_user_msg": "Short natural-language explanation.",
  "forbidden_trigger": false
}
```

Use [function-schema.json](references/function-schema.json) when a function schema is needed. Use [example-output.json](examples/example-output.json) as the compact output example.
