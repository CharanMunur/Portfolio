export interface Blog {
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
}

export const blogs: Blog[] = [
  {
    title: "How It All Started — My Programming Journey",
    description:
      "I started programming a month before my B.Tech even began. This is the story of every assumption I made, and every time I proved myself wrong.",
    tags: ["Journey", "Programming", "Reflection"],
    date: "2026-05-10",
    readTime: "10 min read",
    content: `I started programming a month before my B.Tech even began.

It was during summer holidays, and I was mostly just chilling at home with nothing serious going on. Around that time, AI had also started booming everywhere. Every other video, post, or discussion online was somehow connected to coding, AI, or software. Social media, friends, family — everyone kept talking about how important programming was becoming, especially in engineering.

So sometimes I used to watch random coding videos on YouTube. Someone building websites, someone solving problems, someone typing fast on a black screen with music playing in the background. I kept telling myself *yeah, I should start learning too*, but I never actually started.

One day I told my mom that programming was important in B.Tech. Instead of just agreeing with me, she asked me something simple:

*if it's that important, why aren't you starting?*

I immediately gave my excuse. I told her this old laptop wouldn't support programming properly, that coding needed heavy software and a powerful machine. But after getting scolded properly by her, I started learning almost out of anger because I wanted to prove that I was right.

Turns out, I proved myself wrong instead.

I opened YouTube, found some online compilers, started learning C, wrote basic \`printf\` and \`scanf\` statements, and everything worked perfectly fine. My old laptop handled it without any issues. Before college even started, I had already learned one important thing — most of the limits I believed in were just assumptions.

---

## The Lab Moment

When college finally started, I still remember my first day in the lab. Everyone was trying to understand what was happening, while I was already typing code. Nothing impressive — just print statements, scan statements, and basic operations — but I was still the only one coding at that moment, and people noticed it.

Teachers noticed too.

That small moment got into my head very quickly. I started feeling like I was already ahead of everyone, and because of that, I slowly stopped putting real effort into learning. For almost an entire semester, I just coasted on that early confidence.

Then real topics started coming into the syllabus. Pointers. Functions. Actual logic.

And suddenly I understood nothing.

Because deep down, I never really learned properly. I had only started early.

Exams came, I wrote them badly, scored very less, and that genuinely hurt because everyone around me thought I was good at programming, and even I had started believing it myself.

Around that same time, I got a new laptop — a Samsung Galaxy Book 4. But honestly, I still wasn't deeply into programming yet. I was more into PPT editing back then. Making 3D presentations, motion slides, experimenting with cool transitions and designs. I used to spend hours just trying to make presentations look cinematic.

Looking back now, I think that phase still helped me in some way. It trained my design sense without me even realizing it.

But programming-wise, that semester humbled me hard.

---

## HTML, CSS, and the Styling Rabbit Hole

After that reality check, I properly started learning again. I picked up HTML and CSS, and honestly, I got completely lost in the frontend styling world. Transitions, layouts, effects, animations — every week there was something new to try. I spent hours just experimenting with UI ideas and making things look better.

Looking back, I probably spent too much time there, but at the same time, it trained my eye for frontend development.

Before JavaScript, I also spent some time learning Python. That was the first language where coding actually felt fast to me. Clean syntax, less boilerplate, less fighting with the language itself. Around the same time, I also started DSA and solved around 22 LeetCode problems. Mostly easy problems, but they still taught me how problem solving actually felt.

Then I moved to JavaScript, and web programming felt completely different from everything before it. DOM handling, events, browser behavior — initially it felt slow and confusing. But slowly, after spending enough time with it, things started clicking.

Then I found Tailwind CSS, and after that I genuinely never wanted to go back to vanilla CSS again. Not having to spend mental energy on naming classes for everything felt weirdly freeing.

---

## The Question That Changed Everything

Another semester passed, and at that point I had HTML, CSS, JavaScript, and Tailwind in my hands. I paused for a moment and genuinely questioned myself:

*Do you really think this is enough to get a job?*

And honestly, the answer was no.

That was the point where I started learning React.

React was hard initially. Components, state, props, re-renders — everything took time to understand properly. But after enough iterations and consistency, things slowly started making sense, and I still remember that feeling. It felt like my mind suddenly opened up.

Until then, my mindset was simple: learn 2 or 3 things, master them, and get a job. But React made me realize how massive software development actually is. Frameworks, ecosystems, tooling, backend systems, architecture — there was an entire world outside basic frontend.

Again, I proved myself wrong.

I started building small projects like [SuperTodo](/projects/supertodo) and a [Markdown Editor](/projects/markdown-editor), and for the first time, things actually felt real. That \`bun run dev\` command in the terminal genuinely felt like starting an engine. Like I was building something alive.

---

## The Fake Productivity Trap

This is probably the most important part of this blog.

For a long time, after coming back from college, I used to sit down and watch programming content for hours. Programming news videos, random coding streams, dev Twitter discussions — and the dangerous part is that I genuinely felt productive while doing it.

I felt like I was learning.

I felt like I was making progress.

But I really wasn't.

That type of content quietly destroys consistency because it eats your time without you even noticing. You feel updated, you feel like you're inside the developer world, but weeks pass and your GitHub contribution graph stays empty, your LeetCode heatmap doesn't move, and your projects folder still has nothing real inside it.

Real progress should be visible.

A filled LeetCode heatmap.

A GitHub contribution graph.

A project folder with handwritten code that you actually understand.

Not AI generated code. Not copied code. Your own work.

Even vibecoding felt like progress to me for some time, and honestly, I've done a lot of vibecoding myself. Spinning up apps quickly felt exciting, but the knowledge I gained from it was very surface level. I couldn't explain things deeply because I wasn't really building them myself.

I also used ChatGPT and Claude a lot while learning. Honestly, they helped me a lot too. Sometimes they explained things faster than documentation, and sometimes they helped me get unstuck quickly. But slowly, without realizing it, I started depending on AI too much.

Some days, before even starting a project, I would ask AI what I should build, how I should build it, what stack I should use, how the structure should look — almost like I wanted AI to make decisions for me.

That was another moment where I had to sit back and reflect again.

Then again, like always, I sat back, and proved myself wrong.

I got back to actual development.

I made a really strong decision after that.

I didn't want AI writing everything for me. I didn't want to copy blindly. I didn't want to become someone who couldn't build without prompting first.

So I changed how I used AI completely.

I started treating it like a search tool, a helper, or a second brain for small doubts — not as the main developer. I wanted to keep a 90:10 ratio. I do the 90%. AI helps with the 10%.

That mindset genuinely helped me grow faster because it forced me to think on my own, struggle on my own, debug on my own, and build real foundations instead of fake confidence.

And there is one line I genuinely believe now:

> *a dev can always be a vibecoder, but a vibecoder cannot be a dev.*

Progress is not content consumption. Progress is not vibecoded apps. Progress is what you build, what you understand, and what you can explain from scratch.

---

## Java, and the Language I Thought I'd Hate

By 4th semester, we had Java in college, and honestly, I hated it immediately.

My personal benchmark for judging how difficult a language felt was always the hello world syntax. Python felt simple. JavaScript felt manageable. Then I saw Java:

\`\`\`java
class Main {
    public static void main(String[] args) {
        System.out.println("Start small. Ship something.");
    }
}
\`\`\`

All that syntax just to print one line felt insane to me.

I thought I would somehow survive one semester and move on, but I never liked wasting semester holidays completely. Before 4th sem started, I decided to properly research Java before judging it too quickly.

Then I found out what Java actually powers — enterprise systems, banking infrastructure, government backend systems, massive applications running for decades.

That changed my entire perspective.

Java stopped feeling like pointless boilerplate and started feeling like the OG language behind serious systems.

Then I properly learned it, switched my DSA language to Java, solved around 90 problems, and slowly became comfortable with it. After that, I discovered Spring Boot, and backend development finally clicked for me.

That layered architecture — model, repository, service, controller — felt incredibly satisfying. APIs, routing, backend structure, clean separation — for the first time, I genuinely felt like a fullstack developer instead of just someone building frontend UIs.

---

## The Setup That Keeps Me Going

At some point, I also fixed my desk setup properly, and honestly, it mattered way more than I expected.

When your workspace feels good, you naturally want to sit there and work. You want to open the laptop, learn something, build something, explore something. Environment affects mindset more than people think.

![My desk setup](/images/IMG.png)

---

## Never Settle

Every single semester, I kept proving myself wrong.

I thought old laptops couldn't handle programming. Wrong.

I thought learning 2 or 3 things and stopping was enough. Wrong.

I thought Java was just painful syntax. Wrong.

I thought consuming content meant progress. Wrong.

I thought vibecoding meant learning. Wrong again.

I thought depending too much on AI would still help me grow properly. Wrong.

All the time, I kept exploring more instead of settling into one mindset. I started looking into communities, talking to people, seeing how different developers think and approach learning. That exposure changed me more than tutorials ever did.

I opened my eyes wider every semester.

Now I'm a developer who also grinds DSA. A fullstack developer who still keeps learning, keeps exploring, and keeps proving himself wrong.

And honestly, I want to keep that mindset forever.

Never settle.

---

## The Portfolio

By the end of 4th semester, there was one thing sitting in my mind for a long time — a portfolio.

But I never wanted to build a random static portfolio just for the sake of having one. I wanted it to actually feel like a developer built it.

Now I finally had enough experience to start.

React. TypeScript. Spring Boot. Fullstack projects. 90+ DSA problems. Four semesters of learning, failing, exploring, and proving myself wrong.

So I finally started building it.

*that story's for the next blog.*`,
  },
];
