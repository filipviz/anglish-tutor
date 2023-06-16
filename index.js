import fs from "fs/promises";
import { createInterface } from "readline";
import util from "util";

const table = await fs
  .readFile("./Anglish-Wordbook.csv", { encoding: "utf8" })
  .then((text) => text.split("\n").map((r) => r.trim().split(",")));

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = util.promisify(rl.question).bind(rl);

let right = 0,
  total = 0;

async function quiz() {
  console.clear();
  console.log(`${right} / ${total} (${parseInt((100 * right) / total)}%)\n`);

  let x = Math.floor(table.length * Math.random());
  console.log(`${total + 1}. ${table[x][0].toUpperCase()}\n`);

  let correct = 1 + Math.floor(Math.random() * 4);
  for (let i = 1; i <= 4; i++)
    console.log(
      i === correct
        ? `${i}) ${table[x][2]}`
        : `${i}) ${table[Math.floor(table.length * Math.random())][2]}`
    );

  const answer = await question("\nAnswer (1-4) > ");

  if (answer == correct) {
    console.log(`\nCorrect.`);
    right++;
  } else console.log(`\nWrong. ${table[x][0]} means ${table[x][2]}`);

  console.log(`\n---more---\n`);
  for (const i in table[0])
    if (table[x][i]) console.log(`${table[0][i]} - ${table[x][i]}`);

  total++;
  await question("\nenter to continue ->");
  quiz();
}

quiz();
