const print = console.log;
let RESULT;
const path = require("path");
const fs = require("fs");

const FILE_PATH = path.join(__dirname, "users.json");

function isPrime(num) {
  if (typeof num === undefined) return `Invalid parameter`;
  num = parseInt(num);
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num > 2 && num % 2 === 0) return false;

  const divisor = Math.floor(Math.sqrt(num)) + 1;

  for (let i = 3; i < divisor; i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

function listPrime(num) {
  const primeArray = new Array();
  for (let i = 1; i <= num; i++) {
    if (isPrime(i)) {
      primeArray.push(i);
    }
  }

  return primeArray;
}

function bootStrap() {
  let content, userProfileArray;
  if (fs.existsSync(FILE_PATH)) {
    content = fs.readFileSync(path.join(__dirname, "users.json"), {
      encoding: "utf-8",
      flag: "r",
    });

    content = JSON.parse(content);
    content.unshift(userProfile(false));
  } else {
    userProfileArray = userProfile(true);
  }

  let finalContent = userProfileArray ? userProfileArray : content;

  fs.writeFileSync(FILE_PATH, JSON.stringify(finalContent), {
    encoding: "utf-8",
    flag: "w",
  });
}

function userProfile(type) {
  let username = random_names();
  let profile = {
    username,
    email: `${username.split(" ").join("_").toLowerCase()}@gmail.com`,
  };

  if (type) {
    return [profile];
  }

  return profile;
}

const FIRST_NAMES = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "James",
  "William",
  "Benjamin",
  "Lucas",
  "Henry",
  "Theodore",
  "Jack",
  "Levi",
  "Alexander",
  "Jackson",
  "Mateo",
  "Daniel",
  "Michael",
  "Mason",
  "Sebastian",
  "Ethan",
];

const LAST_NAMES = [
  "Martin",
  "Jackson",
  "Moore",
  "Taylor",
  "Thomas",
  "Anderson",
  "Gonzalez",
  "Smith",
];

function random_names() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];

  return `${first} ${last}`;
}

module.exports = {
  listPrime,
  FILE_PATH,
  bootStrap,
};
