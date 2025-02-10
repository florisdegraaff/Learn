import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    apiKey: process.env.GPT_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    store: false,
    messages: [
      {
        role: "developer",
        content: "\
        Je beoordeelt een antwoord op basis van de volgende criteria:\
        Je ontvangt een vraag, een verwacht antwoord, een gegeven antwoord en optioneel extra instructies.\
        Als het gegeven antwoord voldoende overeenkomt met het verwachte antwoord, retourneer je een JSON-object met \"response\": \"correct\". Als het antwoord incorrect of onvoldoende is, retourneer je een JSON-object met \"response\": \"incorrect\" en voeg je een \"feedback\" veld toe met een uitleg waarom het incorrect is.\
        De beoordeling moet rekening houden met de context en of het antwoord voldoet aan de essentie van het verwachte antwoord.\
        Geef enkel een JSON-object terug, zonder verdere uitleg of tekst erbuiten.\
        Als extra instructies worden meegegeven, houd hier rekening mee bij de beoordeling."
      }
    ]
  })

  const last = response.choices[response.choices.length - 1]

  console.log(last?.message.content)

  res.status(200).json({
    response: JSON.parse(last?.message.content)
  })
}