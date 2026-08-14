# skill-TextureBlindBoxDraw

纹理顺势盲盒创意绘画 Codex Skill。它用于处理用户上传的实拍图：保留原图主体、光照、材质和至少 70% 的实拍信息，只在裂缝、划痕、物体轮廓、边角空白等位置增加黑色细线简笔涂鸦。

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
