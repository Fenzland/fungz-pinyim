楓梓拼音輸入法 (beta)
================================

# 簡介

本項目是楓梓拼音輸入法在 rime 輸入法平臺上的實現，即一種基於 rime 的中文拼音輸入法。
楓梓拼音使用特有的拼音方案，與《現代漢語拼音》（更準確的叫法是“普通話拼音”，後文亦將如此稱呼）等主流方案不同，有更加精確，區分尖團音等特點。
整個項目包含　全拼，雙拼，並擊　三種輸入方案。
本項目仍在開發中，拼音規則還會變化。尤其是詞庫，由於手工區分尖團音等工作尚未完成，還會持續變化，


# 拼音方案

繼承於《現代漢語拼音》，並進行以　*系統化*、*精確化*、*分明化*　爲方向的演化。
最終形成兩個輸入法版本：
* 楓梓拼音（普通話）[fungz_pinyim_mandarin] 對《現代漢語拼音》方案進行優化和規範化，還是基於普通話的發音進行拼寫（不帶聲調）。
* 楓梓拼音 [fungz_pinyim] 在普通話的基礎上，吸收古漢語的音韻規則，對普通話中同音而古漢語中不同音的字進行區分；
對普通話中不同音，而古漢語中同音的字保持區分，除個別字外，保持對普通話的可回歸性。

## 演化調整

#### 1. 去除異化和簡化寫法
“普通話拼音”中有一些多餘的異化(如：`i->yi`,`s->si`)和簡化(如：`jü->ju`,`uen->un`)寫法。
它們對於拼音系統的系統化和精確化有害無利，無謂地佔用了`y`,`w`兩個字母，甚至錯誤地佔用了其他拼音組合(`si`本因是“西”的拼音，卻用來表示根本沒有韻母i的“絲”)。
在本拼音方案中，首先將它們去除。具體有：
```
i   -> y,yi
u   -> w,wu
uen -> un,wen
uei -> ui,wei
iou -> iu,you
üin -> ün,yun
z   -> zi
c   -> ci
s   -> si
zh  -> zhi
ch  -> chi
sh  -> shi
r   -> ri
jü  -> ju
qü  -> qu
xü  -> xu
```

#### 2. 貼近發音

《現代漢語拼音》中有一些拼音並不能忠實地表現發音，如“奧”的韻尾爲 `u` 卻寫作了 `ao`。
“多”和“破”的韻母完全一樣，卻分別寫爲 `duo` 和 `po`　。“內”，“南”，“月”有相同的韻腹，卻分別寫爲 `nei`, `nan` 和 `yue` 等。
本方案對其進行調整，以求精確，具體如下：
```
ao    ->  au
ei    ->  ɛi
üe    ->  üɛ
an    ->  ɛn
bo    ->  buo
po    ->  puo
mo    ->  muo
fo    ->  fuo
fu    ->  f
// feng  ->  fong
// ueng  ->  uong
// ni    ->  ñi
// nü    ->  ñü
iong  ->  üong
```
精細化之後，我們就能表達不同的口音。比如“難”在普通話中發 `nɛn` 而在東北話中，則發 `nan` 。“定”在普通話中爲 `ding` ，北京話中則爲 `dieng` 。


#### 3. 規範寫法，拉丁拼法

普通的電腦鍵盤只能打出 26 個拉丁字母，這對於一個完善的拼音方案通常是不夠的。
於是需要使用多個字符代表一個音。《現代漢語拼音》中的 `zh`, `ch`, `sh`, `ng` 便是如此，這方便了拼寫，卻破壞了一個字母一個音的形式，模糊了單音和複音。
在本方案中，單音的寫法統一爲一個字母對應一個音，類似國際音標。此外有拉丁拼法，便於拼寫。
有一些字母的寫法不在26個字母中，便以多個字母或大寫字母拼出。鍵盤上以拼法輸入，輸入法浮窗上則以寫法顯示。

以下爲普通話中多個字母拼出單音的例子：
```
ž : zh
č : ch
š : sh
ř : rh
ŋ : ng
```
其中，我們對捲舌音的拼法做了統一，將 `r` 改爲 `ř`，拼法爲 `rh`。

以下爲普通話中以大寫字母拼出單音的例子：
```
ü : U
ɛ : E
```
爲什麼使用大寫字母：大多數拼音方案會使用 `v` 來輸入 `ü`，這對於普通話並沒有什麼問題，但考慮到漢語的其它分支中，濁輔音 `v` 是存在的，不能借用。
另外一個常見的選擇是使用 `iu` 或 `ui` 拼出 `ü`，這是更爲合理的選擇，因爲 `ü` = `i`的舌位 + `u` 的脣形。
作者也曾認真考慮過這兩個選項，但還是希望儘可能使用單個字母拼出這個常用的單音。
至於大寫字母不便於輸入的問題，這應該歸咎於鍵盤設計和鍵盤交互設計的失誤，作者可能會寫專題討論此事。
若你的鍵盤和鍵盤交互邏輯符合以下兩點，輸入大寫字母應當是毫無障礙的：修飾鍵都在大拇指上；若修飾鍵從按下到鬆開的過程中，未按下普通鍵，
它們被按下時產生的效果應當在鬆開時復原，不獨立產生任何影響。
你可以通過購買一塊設計更加合理的鍵盤，使用合理的配置來解決問題。由於可以解決，這不會成爲設計輸入法所考慮的因素。

#### 4. 補充遺漏拼音

普通話僅僅是漢語的一個大分支－－北方語中的一個分支，雖是最爲通行的漢語分支，卻也不是漢語的全部。
真正的漢語拼音，應當適用於漢語的所有分支（這是可行的，國際音標甚至做到了適用於幾乎所有人類語言）。
《現代漢語拼音》僅僅爲普通話而設計，完全沒有考慮漢語的其它分支中的聲母和韻母，甚至普通話中存在的韻母“ㄝ”也被遺漏了。
本方案將補充一些遺漏的拼音，儘可能全面地包容。目前補充工作正在進行中。此外由於作者尚未廣泛學習各個分支的漢語，不能詳盡。如有補充，請惠提 issue，感激不盡。
目前補充的拼音有:
```
ɛ : E  (ㄝ，也的韻母)
ñ : ny (一些漢語分支和古漢語中"娘"的聲母)
ŋ : ng (一些漢語分支和古漢語中“我"的聲母)
r : r  (ř 對應的平舌音)
v : v  (一些漢語分支和古漢語中“微"的聲母)
入聲韻尾： M N Ŋ y
```

#### 5. 區分普通話所混淆的發音

前面三步都是在普通話的範圍內進行調整，而這一步將撿回普通話所丟失的，例如尖團之分、清濁之分、脣鼻音、入聲、後鼻音聲母等。
目前的情況爲

已完成

* 尖團音的區分
* [bpmfu]eng和[bpmfu]ong的區分
* 零聲母補影母 y- 
* v- 和 u- 的區分
* ung 和 ong 的區分

進行中

* 前鼻音和脣鼻音的區分
* zh ch 和 dh th 的區分
* 零聲母補疑母 ng- 

計劃

* 補入音 -M -N -Ŋ
* 區分 n- nh- ny- 
* 區分區分莊組聲母(zh,ch,...)與章組聲母(j,q,..)
* 還原日母，讓出rh給俟母
* 區分清濁

區分尖團後，不再使用 `j`, `q`, `x` 三個聲母，而使用 `g`, `k`, `h` 和 `z`, `c`, `s` 六個韻母。如“西”和“希”將分別拼作 `si` 和 `hi`。

莊組聲母的擬音使用 舌尖-顎 音（捲舌音）而非 舌葉-牙 音，因爲 舌葉-牙 音與 舌面-顎 音過與相似。

入聲韻尾使用對應的大寫鼻音字母而非慣用的 -p, -t, -k 或是對應的 -b, -d, -g。
理由其一是 -p, -t, -k 或 -b, -d, -g 本代表爆破音，放在末尾卻又要表示不爆破，同一個字母在不同地方表示不同含義，不妥。
且結尾爆破音由於符號被佔用，將無法表示。理由其二，入聲和鼻音本爲相同韻攝相同韻系，關係緊密。使用 -M -N -Ŋ 可體現這種關係。

在詞庫中，由於需要人工修改，而法像前三步一樣進行批量替換，循序漸進進行。

該步的目的爲進一步區分讀音，減少同音字，同時不增加同音字，並保證能還原普通話的讀音。

由於改變了發音，經過這一步之後，該拼音所代表的便不再是普通話的讀音，而是一種新的讀音。
該讀音也不同於任何時候的古音，而是現代讀音和古音的某種結合。比普通話具有更大的讀音區分度。

在自然的演化中，漢語語音目前的發展階段爲：向着讀音越來越少，同音現象越來越多的方向發展。
並且已經長期處於，並仍將處於此階段。泥母和來母，前鼻音和後鼻音都在混淆中，捲舌音也在消失中。
如同生物的演化，語言的演化有進化也有退化。本拼音方案除了增加區分度以提高輸入選詞效率，也爲語言的退化趨勢帶來一點綿薄的反推力量。

#### 6. 調整個別發音

恢復個別普通話中異化的發音

“牛” 的聲母恢復爲 `ŋ`
“液” 的韻母恢復爲 `iŊ`
“六”、“粥”、“肉”、“軸” 的韻母恢復爲 `uŊ`

去掉一些多餘的口語發音

“熟” 去掉 `shou` 的發音

#### 7. 聲調系統

許多輸入法通常是不區分聲調的，本輸入方案在設計初也未考慮聲調。直至加入了入聲韻尾，方開始考慮。
由於普通話在入聲的處理上是混亂的，本方案將不考慮入聲字在普通話中的聲調。陰平和陽平的區別實爲清濁的區別，已在我們的計劃之中。
因此若要區分聲調，我們需要做的是區分平、上、去三大聲調。聲調是附加在整個音節上的事物，而非某個韻母上，
因此我們不會像《現代漢語拼音》那樣將聲調標在某個單音上。初步計劃是使用後綴代表平聲、上聲和去聲，寫法爲三個特殊字符，拼法可使用 `x`, `j`, `q` 這三個低頻字母。
平聲也加後綴，這讓不加後綴的拼音代表全部三個聲調，達到簡拼的目的。
此外，輕聲、變調（一個、一種、螞蟻）、兒化爲口語化元素，不予考慮。


## 聲母

按發音部位和發音方式如下


|  部位＼方式 | 收爆音(濁)  | 濁爆音(濁) | 爆音(清)    | 爆吹音(清)  | 漏爆音(濁) | 鼻音(濁)   | 收擦音(濁) | 吹擦音(清) | 收塞擦音(濁) |  塞擦音(清)   | 塞吹擦音(清) |
|-------------|-------------|------------|-------------|-------------|------------|------------|------------|------------|--------------|---------------|--------------|
|  脣/脣-齒   | ɓ /ɓ/ (Bw)  | B /b/      | b /p/       | p /pʰ/      |            | m /m/      | v /v/      | f /f/      | B̪ /bv/ (Bv)   | b̪ /pf/ (bf)  | p̪ /pfʰ/ (pf)  |
|  舌尖-齒    | ɗ /ɗ/ (Dw)  | D /d/      | d /t/       | t /tʰ/      | l /l/      | n /n/      | r /z/      | s /s/      | Z /dz/        | z /ts/       | c /tsʰ/       |
|  舌尖-顎    | ᶑ /ᶑ/ (Dhw) | Ď /ɖ/ (Dh) | ď /ʈ/ (dh)  | ť /ʈʰ/ (th)  | ľ /ɭ/ (lh) | ň /ɳ/ (nh)  | ř /ʐ/ (rh) | š /ʂ/ (sh) | Ž /ɖʐ/ (Zh)   | ž /ʈʂ/ (zh)   | č /ʈʂʰ/ (ch)   |
|  舌面-顎    |             |            |             |             |            | ñ /ɲ/ (ny) | X /ʑ/      | x /ɕ/      | J /d̠ʑ/        | j /t̠ɕ/       | q /t̠ɕʰ/       |
|  舌根       | ɠ /ɠ/ (Gw)  | G /g/      | g /k/       | k /kʰ/      |            | ŋ /ŋ/ (ng) | H /ɣ/      | h /x/       |              |              |               |
|  喉         |             |            | y /ʔ/       |             |            |             |           |            |               |              |              |

斜線內爲國際音標；括號內爲拉丁拼寫方法，便於輸入。

### 發音方式

* **收爆音**
	發音部位封閉氣流，聲帶發聲，並爆破，爆破時收住氣流，爆破後不吹氣。爆破時無力量，靠聲帶發音，爲濁音。普通話和英語中無此種音。
* **濁爆音**
	發音部位封閉氣流，聲帶發聲，並爆破，爆破時釋放氣壓，爆破後不吹氣。爆破時無力量，靠聲帶發音，爲濁音。普通話中無此種音，例音有英語中的 **b**uy **d**ie **g**uy 等。
* **爆音**
	發音部位封閉氣流，增大氣壓，並爆破，爆破時釋放氣壓，爆破後不吹氣。爆破時有力量，聲帶不震動，爲清音。例音有普通話中的 ㄅ(b) ㄉ(d) ㄍ(g)，英語中的 s**p**y s**t**yle s**k**y 等。
* **爆吹音**
	發音部位封閉氣流，增大氣壓，並爆破，爆破時釋放氣壓，爆破後吹氣。爆破時有力量，聲帶不震動，爲清音。例音有普通話中的 ㄆ(p) ㄊ(t) ㄎ(k)，英語中的 **p**ie **t**ie **k**yle 等。
* **漏爆音**
	發音部位阻擋但不封閉氣流，氣流漏過，聲帶發聲，並爆破，爆破後不吹氣。爆破時力量弱，靠聲帶發音，爲濁音。例音有普通話的 ㄌ(l)，英語中的 **l**ie 等。
* **鼻音**
	發音部位封閉氣流，鼻腔出氣，聲帶發聲，並爆破，爆破時收住氣流，爆破後不吹氣。爆破時無力量，靠聲帶發音，爲濁音。例音有普通話中的 ㄇ(m) ㄋ(n)，英語中的 **m**y **n**ine 等。
* **收擦音**
	發音部位留下窄縫，收住氣流，聲帶震動發聲。通過聲帶震動發音，爲濁音。例音有普通話中的 ㄖ(r)，英語中的 **r**ight **z**ero **th**en **v**alue 等。
* **吹擦音**
	發音部位留下窄縫，吹氣經過窄縫發聲。通過氣流發音，聲帶不震動，爲清音。例音有普通話中的 ㄈ(f) ㄙ(s) ㄕ(sh) ㄏ(h) ㄒ(x)，英語中的 **f**ive **h**igh **s**ize 等。
* **收塞擦音**
	發音部位封閉氣流，聲帶發聲，並打開窄縫，打開時收住氣流，打開後不吹氣。通過聲帶震動發音，爲濁音。普通話中無此種音，例音有英語中的 **dr**y bri**dg**e 等。
* **塞擦音**
	發音部位封閉氣流，增大氣壓，並打開窄縫，打開時釋放氣壓，打開後不吹氣。聲帶不震動，爲清音。例音有普通話中的 ㄗ(z) ㄓ(zh) ㄐ(j)，英語中的 s**tr**ay 等。
* **塞吹擦音**
	發音部位封閉氣流，增大氣壓，並打開窄縫，打開時釋放氣壓，打開後吹氣。聲帶不震動，爲清音。例音有普通話中的 ㄘ(c) ㄔ(ch) ㄑ(q)，英語中的 s**tr**ay 等。

### 發音部位

* **脣/脣-齒**
	雙脣閉合封閉氣流發爆破音、鼻音和塞音；上齒輕觸下脣發擦音。
* **舌尖-齒**
	舌頭覆蓋上齒封閉氣流發爆破音、鼻音和塞音；舌尖輕觸上齒發擦音；舌尖頂住上齒，兩側漏氣，發漏音。只有舌尖參與，才能發出漏音。
* **舌尖-顎**
	舌頭捲曲頂住上顎封閉氣流發爆破音、鼻音和塞音；舌尖捲曲輕觸上顎發擦音，舌尖捲曲頂住上顎，兩側漏氣，發漏音。也即捲舌音。
* **舌面-顎**
	舌面頂住上顎封閉氣流發鼻音和塞音，舌面靠近上顎發擦音。此部位爆破音與舌尖-齒音難以區分，不採用。
* **舌根**
	舌根頂住上顎封閉氣流發爆破音、鼻音和塞音，舌根靠近上顎發擦音。此部位塞音與爆破音難以區分，不採用。


### 與漢字聲母對應關係

| | | | | | | | | |
|-|-|-|-|-|-|-|-|-|
| |
| 幫 | 滂 | 並 | 明 | 非 | 敷 | 奉 | 微 |
| b | p | B | m | b̪ | p̪ | B̪ | v |
| |
| |
| 端 | 透 | 定 | 泥 | 來 | 精 | 清 | 從 | 心 | 邪 |
| d | t | D | n | l | z | c | Z | s | r |
| |
| |
| 知 | 徹 | 澄 | 孃 | 莊 | 初 | 崇 | 生 | 俟 |
| ď | ť | Ď | ň | ž | č | Ž | š | ř |
| |
| |
| 章 | 昌 | 常 | 書 | 船 | 日 |
| j | q | J | x | X | ñ |
| |
| |
| 見 | 溪 | 羣 | 疑 | 曉 | 匣 |
| g | k | G | ŋ | h | H |
| |
| |
| 影 | 喻 |
| y |  |
| |


### 與“普通話拼音”聲母對應關係

| | | | | | | |
|-|-|-|-|-|-|-|
| |
| b | p | m | f |
| b | p | m | f |
| |
| |
| d | t | n | l | z | c | s |
| d | t | n | l | z | c | s |
| |
| |
| zh | ch | sh | r |
| ž | č | š | ř |
| |
| |
| j | q | x |
| j | q | x |
| |
| |
| g | k | h |
| g | k | h |
| |

除了 `r -> ř` 以外，完全一致。



## 介音（四呼）

流行的拼音方案都吧介音歸入韻母。而作者認爲介音獨立出來，或者歸入聲母更爲洽當。
因爲介音不影響韻腹和韻尾的發音，卻會影響聲母的發音。（例如“端”的發音，並不似“的 - 彎”，而似“都 - 安”；“妙”不似“莫 - 要”，而似“密 - 奧”）
而又因爲聲調會影響韻母和介音，而不影響聲母。介音獨立又優於歸入聲母。

在發音上，介音表達聲母發出時和過渡到韻母時，嘴脣形狀和舌位的不同。
嘴脣有自然和撮起；而舌位有自然和前頂。分別都是兩種狀態，任意組合一共是四種（亦稱“四呼”）。
分別爲：

* 零介音
* 撮口介音 `u`
* 頂舌介音 `i`
* 撮口頂舌介音 `ü` (拉丁寫法爲 `U`)

四呼的傳統稱謂爲： “開口呼”，“合口呼”，“齊齒呼”，“撮口呼”。
事實上，除了“開口呼”，其餘的名稱都不恰當。
`u`並沒有將口合上，而是撮起，和`ü`有一樣的脣形（二者只有舌位不同）。
`i`的發音要點不在齒，而在舌（事實上，`i`與`e`的口型是完全一樣的，僅舌位不同）。
`ü`有兩個要點，撮口僅爲其中一個。
考慮更名爲： “開口呼”，“撮口呼”，“頂舌呼”，“撮頂呼”。

## 韻母

韻母細分爲 韻腹，韻尾 兩部分
```
韻腹4個
  a, e, ɛ, o,
韻尾9個
  i, u, m, n, ŋ, b, d, g, r,
```
`ɛ`, `ŋ` 的拉丁寫法分別爲 `E`, `ng`

除r以外可任意組合。加上介音，組合數乘4。然而在特定的方言中，並非所有組合都會出現。

以下爲楓梓拼音方案中存在的組合（普通字體爲普通話中所剩餘的組合，粗體爲補充的組合）：


|           |            |            |            |
|-----------|------------|------------|------------|
|           |   i     衣 |   u     屋 |    ü    雨 |
|   a    阿 |   ia    亞 |   ua    瓦 |            |
|   e    厄 |            |            |            |
|   ɛ    誒 |   iɛ    也 |            |   üɛ    靴 |
|           |            |   uo    喔 |   üo    喲 |
|   ai   愛 |            |   uai   歪 |            |
|   ɛi   誒 |            |   uɛi   爲 |            |
|   au   傲 |   iau   药 |            |            |
|   ou      |   iou   有 |            |            |
| **em** 任 | **im**  音 |            | **üim** 尋 |
| **eM** 合 | **iM**  十 |            |            |
| **ɛm** 暗 | **iɛm** 岩 | **uɛm** 賺 |            |
| **ɛM** 乏 | **iɛM** 協 |            |            |
|   en   恩 |   in    因 |   uen   溫 |   üin   云 |
| **eN** 疙 | **iN**  一 |            |            |
|   ɛn   安 |   iɛn   言 |   uɛn   完 |   üɛn   元 |
|           | **iɛN** 節 |            | **üɛN** 月 |
|   aŋ   盎 |   iaŋ   羊 |   uaŋ   王 |            |
|   eŋ   登 |   iŋ    硬 |   ueŋ   奣 |            |
| **eŊ** 格 | **iŊ**  昔 |            |            |
|   oŋ      |            |   uoŋ   霐 |   üoŋ   用 |
| **oŊ** 喔 |            | **uoŊ** 啄 |   üoŊ   用 |
|           |            | **uŋ**  翁 | **üŋ**  熊 |
|           |            | **uŊ**  箼 | **üŊ**  育 |
|   er   兒 |            |            |            |



# License

MIT
