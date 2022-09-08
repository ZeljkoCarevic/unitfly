import { readFileSync, promises as fsPromises } from "fs";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { type } from "os";
import { CLIENT_RENEG_LIMIT } from "tls";

let arr;

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  arr = contents.split(/\r?\n/);

  return arr;
}
syncReadFile("./log20201104[1].txt");
//u terminalu runnat node index.jszz

//ovako dobijen tip pretrazivanja

const rl2 = readline.createInterface({ input, output });
const answer2 = await rl2.question(
  "Do you want to search by hours, span of hours, type, or modules: "
);
rl2.close();

const search = async function (question) {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(question);
  rl.close();

  arr.forEach((element) => {
    let found = element.match(answer);

    if (found !== null) {
      console.log(found);
    } else {
      return;
    }
  });
};

if (answer2 === "hours") {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(
    "Input the hours in the format of --->HH:MM : "
  );
  rl.close();

  arr.forEach((element) => {
    let found = element /*substring(11, 16)*/
      .match(" " + answer + "");

    if (found !== null) {
      console.log(found);
    } else {
      return;
    }
  });
} else if (answer2 === "type") {
  search("Input the type of the log message (VRB, DGB, INF, WRN, ERR):  ");
} else if (answer2 === "modules") {
  search("Input the module type: ");
}
//m-vault je uvik isti (?)
if (answer2 === "span" || answer2 === "span of hours") {
  const rlHourSpan = readline.createInterface({ input, output });
  const answerSpanStart = await rlHourSpan.question(
    "Input the start in the format of 'HH:':  "
  );
  const answerSpanEnd = await rlHourSpan.question(
    "Input the end in the format of 'HH:': "
  );
  rlHourSpan.close();

  for (let i = answerSpanStart; i <= answerSpanEnd; i++) {
    arr.forEach((element) => {
      let found = element.match(" " + i + ":");

      if (found !== null) {
        console.log(found);
      } else {
        return;
      }
    });
  }
}
