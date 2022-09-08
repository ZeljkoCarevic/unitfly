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
  "Do you want to search by hours, type, M-files or modules "
);
rl2.close();

//ovo se vrsi ako zeli prema satima, moran jos popravit ovo masu
const search = async function (question) {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(question);
  rl.close();

  arr.forEach((element) => {
    let found = element /*substring(11, 16)*/
      .match(answer);

    if (found !== null) {
      console.log(found);
    } else {
      return;
    }
  });
};

if (answer2 === "hours") {
  search("Unesi sate u sljedecem formatu --->HH:MM ");
} else if (answer2 === "type") {
  //[VRB],[DGB],[INF],[WRN],[ERR]
  search("Unesi tip log-a (VRB, DGB, INF, WRN, ERR)  ");
} else if (answer2 === "modules") {
  search("Unesi tip modula aplikacije ");
}
//m-vault je uvik isti (?)
