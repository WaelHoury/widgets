/* =======================================================
Author      : Wael Houry
Version     : 1.0.0
======================================================= */

//##################################################################

//==============BASE URLS

//--------GENERIC
const RANDOM_QUOTE_URL = "https://api.quotable.io/random?maxLength=150"

//==============Font Names and Sizes
const FONT_NAME_AUTHOR = "HelveticaNeue-MediumItalic"
const FONT_SIZE_QUOTE = 20 //Large
const FONT_SIZE_AUTHOR = 12 //Small

//==============COLORS
const COLORS = {
  grey: {
    l: "#606C88",
    r: "#3F4C6B",
    authorTag: "#C7CAE1"
  },
  red: {
    l: "#D94A4A",
    r: "#BF414C",
    authorTag: "#F1E3C7"
  },
  electricViolet: {
    l: "#4776E6",
    r: "#8E54E9",
    authorTag: "#FCDDF5"
  },
  quoteText: "#FFFFFF"
}

let API_URL = RANDOM_QUOTE_URL
API_URL = RANDOM_QUOTE_URL
const random = randomIntFromInterval(1, 3)
console.log(random)
switch (random) {
  case 1:
    BGCOLOR = {
      l: "#606C88",
      r: "#3F4C6B",
      authorTag: "#C7CAE1"
    }
    break
  case 2:
    BGCOLOR = {
      l: "#D94A4A",
      r: "#BF414C",
      authorTag: "#F1E3C7"
    }
    break
  default:
    BGCOLOR = {
      l: "#4776E6",
      r: "#8E54E9",
      authorTag: "#FCDDF5"
    }
}
// } else if (args.widgetParameter === "2") {
//   API_URL = 2_QUOTES_URL
//   BGCOLOR = {
//     l: "#D94A4A",
//     r: "#BF414C",
//     authorTag: "#F1E3C7"
//   }
// } else if (args.widgetParameter === "3") {
//   API_URL = 3_QUOTES_URL
//   BGCOLOR = {
//     l: "#4776E6",
//     r: "#8E54E9",
//     authorTag: "#FCDDF5"
//   }

const data = await fetchRandomQuote()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function fetchRandomQuote() {
  const urlToFetch = API_URL
  const quote_JSON = await fetchJSON(`${urlToFetch}`)
  const quote = quote_JSON.content || quote_JSON.quote
  const author = quote_JSON.author
  return {
    quote,
    author
  }
}

/**
 * Make a REST request and return the response*
 * @param {*} url URL to make the request to
 * @param {*} headers Headers for the request
 */
async function fetchJSON(url, headers) {
  try {
    console.log(`Fetching url: ${url}`)
    const request = new Request(url)
    //   req.headers = headers;
    const response = await request.loadJSON()
    return response
  } catch (error) {
    console.log(`Couldn't fetch ${url}`)
  }
}

//==========================
// Creating Widget function
//-----
function createWidget(data) {
  console.log(`Creating widget with: ${JSON.stringify(data)}`)
  const widget = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color(BGCOLOR.l), new Color(BGCOLOR.r)]
  bgColor.locations = [1.0, 0.0]
  bgColor.startPoint = new Point(1, 1)
  bgColor.endPont = new Point(0, 0)
  widget.backgroundGradient = bgColor
  widget.setPadding(0, 0, 0, 0)
  // widget.useDefaultPadding();

  //===STACK 1 - VERTICAL
  const quoteVerticalStack = widget.addStack()
  quoteVerticalStack.layoutVertically()
  quoteVerticalStack.setPadding(0, 20, 0, 24)

  //-------VSTACK - upper spacer
  quoteVerticalStack.addSpacer()

  //-------VSTACK - QUOTE
  const quote = quoteVerticalStack.addText('"' + `${data.quote}` + '"')
  quote.textColor = Color.white()
  quote.textOpacity = 1.0
  // quote.font = new Font(FONT_NAME_QUOTE, FONT_SIZE_QUOTE)
  quote.font = Font.boldSystemFont(FONT_SIZE_QUOTE)

  //-------VSTACK - lower spacer
  quoteVerticalStack.addSpacer()

  //====STACK 2 - HORIZONTAL
  const authorHorizontalStack = widget.addStack()
  authorHorizontalStack.layoutHorizontally()
  authorHorizontalStack.setPadding(0, 0, 12, 24)
  // authorHorizontalStack.backgroundColor = new Color(COLORS.red.l)

  //-------HSTAC- left spacer
  authorHorizontalStack.addSpacer()

  //-------HSTAC - AUTHOR TEXT
  const author = authorHorizontalStack.addText(`-  ${data.author}`)
  author.textColor = new Color(BGCOLOR.authorTag)
  author.textOpacity = 0.8
  // author.font = Font.italicSystemFont(FONT_SIZE_AUTHOR);
  author.rightAlignText()
  author.font = new Font(FONT_NAME_AUTHOR, FONT_SIZE_AUTHOR)

  return widget
}
