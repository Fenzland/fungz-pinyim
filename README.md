楓梓拼音輸入法 (beta)
================================

# 簡介

本項目是楓梓拼音輸入法在 rime 輸入法平臺上的實現，即一種基於 rime 的中文拼音輸入法。
楓梓拼音使用特有的拼音方案，與《現代漢語拼音》（更準確的叫法是“普通話拼音”，後文亦將如此稱呼）等主流方案不同，有更加精確，區分尖團音等特點。
整個項目包含　全拼，雙拼，並擊　三種輸入方案。
本項目仍在開發中，拼音規則還會變化。尤其是詞庫，由於手工區分尖團音等工作尚未完成，還會持續變化，


# 拼音方案

繼承於“普通話拼音”，並進行以　*系統化*、*精確化*、*分明化*　爲方向的演化。

## 演化調整

#### 1. 去除異化和簡化寫法
“普通話拼音”中有一些多餘的異化(如 零聲母`i->yi`,`s->si`)和簡化(`jü->ju`,`uen->un`)寫法。
它們對於系統化和精確化有害無利，無謂地佔用了`y`,`w`兩個字母，甚至錯誤地佔用了其他拼音組合(`si`本因是“西”的拼音，卻用來表示根本沒有韻母i的“絲”)。
在楓梓拼音中，他們不存在。這些被去除的異化和簡化具體有：
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

#### 2. 補充遺漏拼音

“普通話拼音”作爲普通話（漢語的一個主要分支）並未完整收錄漢語中的聲母和韻母，甚至普通話中存在的韻母“ㄝ”也被遺漏了。
楓梓拼音中會補充一些遺漏的拼音。目前補充工作尚未完成，如濁音聲母、入聲韻尾等尚有待補充。此外由於作者尚未廣泛學習各個分支的漢語，不能詳盡。如有補充，請惠提 issue，感激不盡。
目前補充的拼音有:
```
聲母: ñ("娘"的聲母), r(一些漢語分支中出現的平舌音，對應的卷舌音寫爲ř)，ŋ(一些漢語分支中“我"的聲母)
韻母: ə(ㄝ)
```

#### 3. 貼近發音

“普通話拼音”中有一些拼音並不能忠實地表現發音，如“奧”的韻尾爲 `u` 卻寫作了 `ao`。“多”和“破”的韻母完全一樣，卻分別寫爲 `duo` 和 `po`　。“內”，“南”，“月”有相同的韻腹，卻分別寫爲 `nei`, `nan` 和 `yue` 等。
楓梓拼音對其進行調整，以求精確，具體如下：
```
ao    ->  au
ei    ->  əi
üe    ->  üə
an    ->  ən
bo    ->  buo
po    ->  puo
mo    ->  muo
fo    ->  fuo
fu    ->  f
feng  ->  fong
ueng  ->  uong
ni    ->  ñi
nü    ->  ñü
iong  ->  üong
```
精細化之後，我們就能表達不同的口音。比如“南”在普通話中發 `nən` 而在東北話中，則發 `nan` 。“定”在普通話中爲 `ding` ，京腔中則爲 `dieng` 。

#### 4. 區分普通話所混淆的發音

前面三步都是在普通話的範圍內進行調整，而這一步將撿回普通話所丟失的。目前的情況爲

已完成

* 尖團音的區分
* [bpmfu]eng和[bpmfu]ong的區分

進行中

* 前鼻音和脣鼻音的區分
* v 和 u 的區分
* zh ch 和 dh th 的區分
* ung 和 ong 的區分

區分尖團後，不再使用 `j`, `q`, `x` 三個聲母，而使用 `g`, `k`, `h` 和 `z`, `c`, `s` 六個韻母。如“西”和“希”將分別拼作 `si` 和 `hi`。

在詞庫中，由於無需要人工修改，而法像前三步一樣進行批量替換，循序漸進進行。

此外，仍然會保留不區分這些混淆發音的純普通話詞庫版本。



## 聲母

按發音部位和發音方式如下


|  部位＼方式	 | 收爆音(濁)   | 濁爆音(濁)  | 爆音(清)     | 爆吹音(清)   | 漏爆音(濁)  | 鼻音(濁)    | 收擦音(濁)  | 吹擦音(清)  | 收塞擦音(濁) |  塞擦音(清)   | 塞吹擦音(清)  |
|------------|-------------|------------|-------------|-------------|------------|------------|------------|------------|-------------|-------------|--------------|
|  脣/脣-齒	 | ɓ /ɓ/ (Bw)  | B /b/      | b /p/       | p /pʰ/      |            | m /m/      | v /v/      | f /f/      | B̪ /bv/ (Bv) | b̪ /pf/ (bf) | p̪ /pfʰ/ (pf) |
|  舌尖-齒	 | ɗ /ɗ/ (Dw)  | D /d/      | d /t/       | t /tʰ/      | l /l/      | n /n/      | r /z/      | s /s/      | Z /dz/      | z /ts/      | c /tsʰ/      |
|  舌尖-顎	 | ᶑ /ᶑ/ (Dhw) | Ď /ɖ/ (Dh) | ď /ʈ/ (dh)  | ť /ʈʰ/ (th) | ľ /ɭ/ (lh) | ň /ɳ/ (nh)  | ř /ʐ/ (rh) | š /ʂ/ (sh) | Ž /ɖʐ/ (Zh) | ž /ʈʂ/ (zh) | č /ʈʂʰ/ (ch) |
|  舌面-顎	 |             |            |             |             |            | ñ /ɲ/ (ny) | X /ʑ/      | x /ɕ/      | J /d̠ʑ/      | j /t̠ɕ/      | q /t̠ɕʰ/      |
|  舌根  	 | ɠ /ɠ/ (Gw) | G /g/      | g /k/       | k /kʰ/      |            | ŋ /ŋ/ (ng) | H /ɣ/      | h /x/      |             |             |              |
|  喉    	 |            |            | y /ʔ/       |             |            |             |            |            |             |             |              |

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
* 撮口頂舌介音 `ü` (的拉丁寫法爲 `U`)

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
  a, e, ə, o,
韻尾9個
  i, u, m, n, ŋ, b, d, g, r,
```
`ə`, `ŋ` 的拉丁寫法分別爲 `E`, `ng`

可任意組合。

我們目前只關心普通話中存在的組合(包含介音)：

```
ia,ua,
iə,üə,
uo,üo,
ai,uai,
əi,uəi,
au,iau,
ou,iou,
en,uen,ueŋ
ən,iən,üən,uən,
in,üin,
aŋ,iaŋ,uaŋ，
oŋ,üoŋ,uoŋ,
eŋ,
iŋ,
er,
```


# License

MIT
