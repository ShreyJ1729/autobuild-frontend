import openai
import os
import dotenv
import json

dotenv.load_dotenv("../.env")
openai.api_key: str = os.getenv("OPENAI_API_KEY")
print(openai.api_key)


class OpenAPI:

    @staticmethod
    def _run_prompt(prompt: str,
                    engine: str,
                    max_tokens: int,
                    temperature: float,
                    top_p: float,
                    frequency_penalty: float, 
                    presence_penalty: float
                ) -> str:
        """
        Runs an OpenAI completion prompt [private function]
        @param prompt: The prompt to run
        @param max_tokens: The maximum number of tokens to generate
        @param temperature: The temperature of the model
        @param top_p: The top_p of the model
        @param frequency_penalty: The frequency penalty of the model
        @param presence_penalty: The presence penalty of the model
        @return output: The output of the prompt
        """
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            temperature=temperature,
            max_tokens=max_tokens,
            top_p=top_p,
            frequency_penalty=frequency_penalty,
            presence_penalty=presence_penalty,
        )
        print(response)
        return response.choices[0].text
    

    @staticmethod
    def run_prompt(prompt: str, code: bool) -> str:
        """
        Runs an OpenAI completion prompt
        @param prompt: The prompt to run
        @param code: Whether or not the prompt is code
        @return output: The output of the prompt
        """
        return OpenAPI._run_prompt(prompt, "davinci-codex" if code else "text-davinci-003", 500, 0, 1, 0, 0)