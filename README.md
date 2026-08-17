# skill-TextureBlindBoxDraw

纹理顺势盲盒创意绘画 Codex Skill。它用于处理用户上传的实拍图：保留原图主体、光照、材质和至少 70% 的实拍信息，让两处以上真实纹理共同形成一眼可见、有惊喜转折的局部涂鸦事件。生成图应当明显不同于原图，但不会被全盘重绘成插画。

v1.3.1 默认使用强度 3、可见度 4、惊喜度 4。主事件在 512px 缩略图中不仅要能被发现，还必须看清主角轮廓、动作和关键道具；只有小表情、孤立火柴人、箭头、拉绳或插旗的通用方案会被判定为低创意并重新构思。

仓库地址：<https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw>

## 安装

使用统一的 Agent Skills CLI 安装：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw --skill texture-blind-box-draw
```

安装到 Codex，并全局使用：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw --skill texture-blind-box-draw --agent codex --global --yes
```

也可以直接安装 skill 子目录：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw/tree/main/skills/texture-blind-box-draw --agent codex --global --yes
```

查看仓库里可安装的 skill：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw --list
```

## 目录结构

```bash
skills/texture-blind-box-draw/
  SKILL.md
  agents/openai.yaml
  references/
  examples/
```

统一入口是 `skills/texture-blind-box-draw/SKILL.md`。它包含标准的 `name` 和 `description` frontmatter，`npx skills` 会根据这个文件发现并安装 skill。
