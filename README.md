# skill-TextureBlindBoxDraw

纹理顺势盲盒创意绘画 Codex Skill。它用于处理用户上传的实拍图：保留原图主体、光照、材质和至少 70% 的实拍信息，只在裂缝、划痕、物体轮廓、边角空白等位置增加黑色细线简笔涂鸦。

## 目录

标准 Codex skill 在：

```text
skills/texture-blind-box-draw/
  SKILL.md
  agents/openai.yaml
  references/
  examples/
```

## Codex 安装

发布到 GitHub 后，别人可以在 Codex 里安装：

```text
$skill-installer install https://github.com/<owner>/<repo>/tree/main/skills/texture-blind-box-draw
```

## npx 安装

发布到 npm 后，别人可以运行：

```bash
npx add-texture-blind-box-draw-skill
```

默认安装到 `$CODEX_HOME/skills/texture-blind-box-draw`；如果没有设置 `CODEX_HOME`，则安装到 `~/.codex/skills/texture-blind-box-draw`。

覆盖安装：

```bash
npx add-texture-blind-box-draw-skill -- --force
```

安装到自定义 skills 目录：

```bash
npx add-texture-blind-box-draw-skill -- --dest /path/to/skills
```

## 发布 npm

确认包内容：

```bash
npm pack --dry-run
```

登录并发布：

```bash
npm login
npm publish
```
