# voicify (prototype)

An highly efficient and blazing fast Text-To-Speech (TTS) software

## Table of contents

- [Definition](#definition)
- [Text Parsing or Formatting](#text-parsing-or-formatting)
- [The scanner](#the-scanner)

## Definition

- **`Top-Level Text Element`**: 

A Top-Level Text Element (TLTE) is any element that matches the following **`**criteria**`** and at least one of the following **`**conditions**`**.

**`Criterias :`**

1. It must be a valid element. A valid element is any element that has **nodeType === 1** or **nodeName === '#text'**.

2. It should not be empty.

3. It should contain a **pure text node** (The real text itself only without the element wrapping it)

```html
<!-- "Hi", "mom" and "!" are all pure text nodes but not "<p>Hi <b>mom</b> !</p>" or "<b>mom</b>" -->
<p>Hi <b>mom</b> !</p>
```

If the element matches all the criteria above, it will then go through two (02) conditions, of which it must satisfy at least one to be considered a TLTE.

**`Conditions :`**

1. If the element does not have an inline property like a **span** for example, then it is considered a TLTE.

```html
<!-- "e0" is a TLTE -->
<p id='e0'>Hello World !</p>

<!-- This "e0" is also a TLTE - The tag name doesn’t matter; only the element’s properties do. -->
<div id='e0'>Hello World !</div>
```

2. If the element has an **inline** property but contains no **pure text** and has no **text elements** as siblings, neither previous nor next, then it is considered a TLTE.

```html
<!-- Here it's "e1" the TLTE not "e0" - Remember that a TLTE should always have a “pure text” node. -->
<p id='e0'>
    <b id='e1'>Hello World !</b>
</p>
```

```html 
<!-- 
In this case "e1" is not a TLTE because it has 'pure text' as siblings.

But note that now, "e0" is a TLTE because it has 'pure text' nodes, which are ["Hi everyone, I am a"] and ["software engineer"]

Also, "<b id='e1'>senior</b>" is a 'text element' for "e0" not a 'pure text'. Keep that difference in mind.
-->
<p id='e0'>
    Hi everyone, I am a <b id='e1'>senior</b> software engineer.
</p> 
```

Refer to the function **`isTopLevelTextElementFunc()`** to see the code.

## Text Parsing or Formatting

First of all, we need to discuss the **contentType**. The contentType refers to the type of text node inside a TLTE. It can be one of the following:

- **`PLAIN TEXT (CT0)`** 

```html
<!-- As you can see here, the content of the element is a pure text. -->
<p id='e0'>
    Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
</p>
```

Once parsed or formatted, the element’s content will look like the following:

```html
<p id='e0'>
    <v-paragraph>
        <v-sentence>
            <v-word>Lorem</v-word> <v-word>Ipsum</v-word> <v-word>is</v-word>
            [...]<v-word>typesetting</v-word> <v-word>industry.</v-word>
        </v-sentence>
        <v-sentence>
            <v-word>Lorem</v-word> <v-word>Ipsum</v-word> <v-word>has</v-word>
            [...]<v-word>specimen</v-word> <v-word>book.</v-word>
        </v-sentence>
    </v-paragraph>
</p>
```

What's that ?

As you can see, each word is wrapped in a `<v-word></v-word>`, each sentence is wrapped in a `<v-sentence></v-sentence>`, and all sentences are then wrapped together in a `<v-paragraph></v-paragraph>` to form a paragraph. The reason I chose to create custom tags is to avoid any interference with the user’s CSS.

All these custom tags are used by Voicify to highlight sentences and words accurately and effortlessly, achieving a high level of efficiency by leveraging JavaScript’s excellent performance for rendering tasks.

It may look intimidating at first, but don’t worry! In fact, the content of the element changes to that unusual format only when the mouse hovers over it or when the text inside the element is being read.

In all other cases, the original text is rendered in the DOM. This means it’s safe, as the modifications are not permanent and occur only when needed.

Refer to the function **`formatPlainTextFunc()`** to see the code.

- **`TEXT WITH NESTED INLINE TEXT ELEMENT (CT1)`**

As you can see below, this is a text element that contains inline text elements.

```html
<p id='e0'>
    Lorem Ipsum is <span>simply dummy text</span> of the printing and
    typesetting industry. Lorem Ipsum has been the
    industry's <b>standard</b> dummy text ever since the 1500s,
    when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
</p>
```

Here, the presence of nested elements makes parsing more challenging. Let’s examine the following template.

```html
<p id='e0'>
    This is <span>sentence A. And this</span> is sentence B.
</p>
```

Can you see the danger here ? 

Okay! Let’s try formatting it as we did before. We should get something like this:

```html
<p id='e0'>
    <v-paragraph>
        <v-sentence>This is <span>sentence A.</v-sentence> <v-sentence>And this</span> is sentence B.</v-sentence>
    </v-paragraph>
</p>
```

Can you see what's wrong? I mean the following:

```html
<span>sentence A.</v-sentence> <v-sentence>And this</span>
```

In fact, because the end of the first sentence and the beginning of the second sentence are wrapped inside a **span**, there is a risk of a problematic overlap that will never work as expected.

In such situations, the browser’s default behavior is to split the **span** into two separate elements and insert opening or closing tags as needed to remain consistent with web standards. Regardless, this is far from ideal!

But Eureka! I found a good solution to overcome this issue. It was a truly exciting challenge. So, what was my solution? I called it fragmentation!

I simply created another custom tag called **v-frag**. It’s essentially a **span** with a different name.

Now we can safely format it like this:

```html
<p id='e0'>
    <v-frag data-eid='a_0'>
        <v-word>This</v-word>
        <v-word>is</v-word>
    </v-frag>

    <span>
        <v-frag data-eid='a_1'>
            <v-word>sentence</v-word>
            <v-word>A.</v-word>
        </v-frag>

        <v-frag data-eid='b_0'>
            <v-word>And</v-word>
            <v-word>this</v-word>
        </v-frag>
    </span>
        
    <v-frag data-eid='b_1'>
        <v-word>is</v-word>
        <v-word>sentence B.</v-word>
    </v-frag>
</p>
```

Do you see the difference now!?

The frags **a_0** and **a_1** will act together, meaning they will highlight simultaneously while reading or hovering, to represent the sentence **“This is sentence A”**. Similarly, frags **b_0** and **b_1** will act together to represent **“This is sentence B.”** It’s as simple as that! We have fragmented the sentence into small pieces in the DOM, like constructing a puzzle.

Now you might ask: where are **v-paragraph** and **v-sentence**? They are still present, but not as **“physical”** elements in the DOM. In this case, they exist as **“virtual”** elements. I can’t go into more detail here for now.

Now let’s talk about the dataset **data-eid**. Every custom Voicify element has a **data-eid**, where **eid** stands for **Element ID**. It’s simply a way to select or identify an element, similar to using an **id** or **class**.

To give you a visual representation of what I mean by saying that sentences and paragraphs are now **“virtual”**, let’s look at the following objects:

```ts
/* Sentence A (virtual) */
const sa = {
    eid: 'sentence_a_id',
    fragsEid: ['a_0', 'a_1']
};

/* Sentence B (virtual) */
const sb = {
    eid: 'sentence_b_id',
    fragsEid: ['b_0', 'b_1']
};

/* Paragraph of sentences A & B */
const para = {
    eid: 'paragraph_eid',
    sentencesEid: ['sentence_a_id', 'sentence_b_id']
};
```

Now it’s clearer, I believe. It could be organized in a better way; this is just an example.

Refer to the function **`formatTextWithNestedInlineElementFunc()`** to see the code.

- **`TEXT WITH NESTED NOT INLINE TEXT ELEMENT (CT2)`**:

```html
<div id='e0'>
    Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.

    <p id='e1'>
        It has survived not only five centuries, but also the leap
        into electronic typesetting, <b>remaining essentially
        unchanged</b>. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with <span>desktop publishing
        software</span> like Aldus PageMaker including versions of
        Lorem Ipsum.
    </p>
</div>
```

The design above is not very common, but the goal is to read aloud every readable text on the screen from the user’s perspective, no matter what. In fact, the user doesn’t see what happens in the background, and if the player skips a sentence or an entire paragraph, it could look odd and negatively impact the user experience.

Another important thing to note is that both **“e0”** and **“e1”** are TLTEs. How is that possible?

Referring to the definition of a TLTE, you can see that both of them meet the three basic criteria and the first of the two final conditions required to be a TLTE. From now on, you should know that TLTEs can be **nested**.

Text formatting here works exactly the same way as in the two previous cases, **CT0** and **CT1**. If you look carefully, you’ll notice that the first node of “e0” is a ‘pure text’ node, resembling **CT0**, while its second node, **“e1”**, is a ‘text element’ that is also a TLTE, resembling **CT1**.

Thus, we can deduce that **CT2** is essentially a nested combination of two or more **CT0** and **CT1** nodes, in any order. This means that a node in **CT2** that meets the requirements of **CT0** will be formatted using the **CT0** algorithm, and the same applies for **CT1**, with CT standing for **Content Type**.

Refer to the function **`formatTextWithNestedNotInlineElementFunc()`** (notice the **Not**) to see the code.

## The Scanner

To read, select, or identify elements, Voicify doesn’t loop through the DOM. Instead, it uses a **scanner** consisting of a grid of points on the screen and the function document.**elementFromPoint(x, y)** to access and process elements.

The scanner continuously scans the screen on every **requestAnimationFrame()** call (it'll optimize in the future), with a manual scanning interval set to 1s. This is a highly efficient and reliable way to perform this kind of action without adding overhead or impacting main thread performance. It’s completely different from using **setInterval()** in terms of efficiency — not even close!

By proceeding this way, the scanner allows detection of new content dynamically, efficiently, and effortlessly, whereas looping through the DOM can be tricky depending on its structure. Another advantage of the scanner is that **it always selects and reads visible text**, avoiding the risk of reading text that the user cannot see.

The only limitation of the scanner is that it cannot access elements outside the viewport. Therefore, the best approach is likely to combine both **scanning** and l**ooping through the DOM** for an optimal setup. One method can scan dynamically, while the other scans deeply.

Refer to the object **scan**, which holds the scanning functions, and the function **processElementFunc()** to see the implementation.

