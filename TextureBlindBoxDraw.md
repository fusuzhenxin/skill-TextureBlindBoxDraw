# Skill: 纹理顺势盲盒创意绘画 TextureBlindBoxDraw_v1.1

## 安装

本项目已经按 Agent Skills 标准提供 skill 入口。推送到 GitHub 后，使用下面的命令安装：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw --skill texture-blind-box-draw
```

只安装到 Codex 并全局使用：

```bash
npx skills add https://github.com/fusuzhenxin/skill-TextureBlindBoxDraw --skill texture-blind-box-draw --agent codex --global --yes
```

实际被 Agent 读取的标准文件是：

```text
skills/texture-blind-box-draw/SKILL.md
```

## 元信息
| 字段 | 值 |
|------|----|
| skill_id | TextureBlindBoxDraw_v1.0 |
| name | 纹理顺势盲盒创意绘画 |
| version | 1.1 |
| type | 图像局部增量增强，非全图生成 |
| description | 接收用户实拍照片，从裂缝、划痕、阴影、反光、污渍、物体轮廓、色块、自然纹理或留白中发现一个**隐藏微型事件**，做局部简笔涂鸦增量创作；原图实拍信息保留≥70%，只做加法不做减法，实现“画面里本来就发生着一件小事”的盲盒效果；禁止全盘重绘为插画/二次元。 |
| dependency | 图像解析、局部inpaint能力；**必须依赖用户上传原图作为基底，不能凭空生成图片** |

## 输入
1. user_image: 用户上传原始实拍图片（必填）
2. user_prompt: 用户附加文本指令（可选）
3. auto_analysis: 内部图像自动检测结果
    - has_crack_scratch: 是否存在裂缝/龟裂/划痕缝隙
    - has_anthropomorphic_object: 是否存在可拟人物体(食物、石头、果蔬等)
    - has_free_space: 是否存在可作画的边角空白区域
4. user_override_mode: 用户手动指定模式，优先级最高

## 输出字段
- active_mode: 激活的工作模式枚举
- intensity_level: 强度档位 1‑5
- analysis_note: 原图可创作区域分析文本
- creative_theme: 隐藏事件创意主题
- hidden_event: 画面里正在发生的微型事件
- texture_evidence: 支撑事件的原图视觉线索
- character_relation: 角色/事件与原图物体或纹理的关系
- reveal_point: 用户第二眼发现事件的微小线索
- prompt_set: {positive:str, negative:str} 完整局部重绘提示词
- suggest_user_msg: 给到用户的自然交互话术
- forbidden_trigger: bool 是否触发黑名单；true=禁止执行该创意

## 隐藏事件创意系统

每次创作只生成一个连贯的隐藏微型事件，不做随机贴纸集合。按以下顺序构思：

1. 从照片中选择一条原生线索：裂缝、阴影、反光、污渍、木纹、褶皱、电线、蒸汽、食物摆放关系或边角留白。
2. 为线索安排一个动作：修补、测绘、攀登、运送、躲藏、等待、考古、演出、守夜或逃跑。
3. 让角色依赖真实纹理行动，不能漂浮在照片上。
4. 增加一个第二眼才发现的 reveal clue：旗帜、脚印、路线、工具、半扇门、路牌、错位影子或未完成的任务。
5. 从治愈日常、都市考古、微型冒险、荒诞幽默、悬疑发现、隐藏童话、极简艺术中选择一个主题。

避免把创意简化成统一的圆眼睛和笑嘴。优先表现动作、关系和一个具体的小道具。

## 5种工作模式
### Mode‑1 CrackTrace 缝隙裂纹衍生角色
触发条件：has_crack_scratch = true
> 优先复用原生裂缝作为角色轮廓，只补画五官、手脚、配饰；角色依附裂纹走向；黑色细简笔马克笔线条。
> 案例：斑马线裂纹顺着裂缝画小动物。

### Mode‑2 ObjectAnthropo 物体本体拟人
触发条件：has_anthropomorphic_object = true
> 物体本体颜色、形状、光影100%保留；仅叠加极小简笔五官（圆点眼睛、弯嘴巴），禁止改变物体外形。

### Mode‑3 MicroWorld 角落微型小世界
触发条件：has_free_space = true
> 主体完全不动；仅在边角、缝隙、边缘放置**微型简笔小人/小道具**；涂鸦总面积≤10%，不抢夺视觉重心。

### Mode‑4 SymbolDecorate 符号轻氛围感
触发条件：用户不希望画生命体
> 只增加星星、气泡、小箭头简笔符号，不绘制任何生物角色。

### Mode‑5 CustomFree 用户自定义模式
触发条件：user_prompt包含明确自定义创意
> 遵守“原图≥70%保留”约束，注入用户创意，执行黑名单校验。

## 强度档位 intensity_level
> 涂鸦占画面总面积控制，系统默认=2
|档位|涂鸦占比|说明|
|---|---|---|
|1 极淡|≤5%|仅1‑2处微小细节，若隐若现盲盒感|
|2 轻度|5‑15%|【系统默认】少量角色，自然舒适|
|3 中等|15‑25%|多处角色，故事感增强|
|4 较强|25‑30%|画面热闹；系统自动上限|
|5 极强|=30%|**必须用户确认才启用，系统绝不自动选择**|

> 硬性铁律：**无论任何档位，原图实拍信息占比 ≥70%，不可突破红线**

## Prompt片段库
### 全局基础正向（所有模式必拼接）

#### 模式追加正向片段
- Mode1: `沿着图片原生裂缝、划痕做简笔画，裂缝直接充当小动物轮廓，只补画五官手脚`
- Mode2: `给画面物体叠加极小的简笔五官圆点眼睛、弯弯嘴巴，物体本身完全不变形`
- Mode3: `在画面边角空白缝隙增加非常微小的简笔小人，人物尺寸很小，不干扰主体`
- Mode4: `只增加少量简笔星星气泡符号，不画任何生命体角色`

### 全局强制反向Prompt（全部模式必带）


## 黑名单校验规则（命中任意一条 forbidden_trigger=true）
1. 禁止把实拍照片整体转卡通插画，仅允许局部叠加涂鸦增量
2. 禁止修改原图核心物体形态、颜色、材质
3. 禁止涂鸦总面积超过30%
4. 禁止涂鸦角色尺寸过大抢占原图主体视觉
5. 禁止彩色厚涂涂鸦，只允许黑色简笔线条
6. 禁止抹除原图实拍噪点、瑕疵、脏点

> 用户强制要求突破黑名单时回复：
> “该Skill定位是原图局部增量涂鸦，不支持全盘重绘。如果需要完整插画效果，请使用普通AI图像生成。”

## 多轮交互协议
1. **首轮：用户上传图片**
    - 运行自动图像检测器，自动选mode，默认 intensity_level=2
    - 输出 suggest_user_msg模板：
    > 已解析图片，自动启用【纹理顺势盲盒创意绘画】，选用{mode名称}，强度档位{intensity_level}。会保留绝大多数实拍画面，顺着原图纹理增加简笔小涂鸦，不会改动原有物体。你可以告诉我调强/调淡，更换模式，或者指定画什么内容。

2. 用户反馈太花哨 → intensity_level -=1；已经level=1则切换Mode4
3. 用户反馈不够好玩 → intensity_level +=1；最高自动到4，level5需要用户确认
4. 用户指定玩法 → 切换到对应mode
5. 用户想要大幅改动画面 → 触发黑名单提示能力边界

## 示例输入输出（饭菜实拍图）
- 输入图片：餐桌饭菜实拍
- auto_analysis：has_crack_scratch=false, has_anthropomorphic_object=true, has_free_space=true
- active_mode: Mode‑2 ObjectAnthropo
- intensity_level:2
- analysis_note：画面包含米饭、大虾、炒蛋等可拟人物食材，无裂纹，餐盘边缘存在少量空白。
- suggest_user_msg：
> 已解析图片，自动启用【纹理顺势盲盒创意绘画】，选用【物体本体拟人】，强度档位2。会完整保留饭菜、餐盘、筷子、汤水，只给大虾、炒蛋、米饭加上小小的简笔表情。可以告诉我调强、调淡或者换成角落微型小人模式。
