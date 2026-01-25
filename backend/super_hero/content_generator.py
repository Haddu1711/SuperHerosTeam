import requests
import json
import os

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")


def generate_team_ai_text(team):
    hero_details = []
    for m in team.members.all():
        hero_details.append({
            "hero_name": m.hero.name,
            "hero_work": m.hero.work,
            "hero_alignment": m.hero.alignment,
            "hero_powerstats": {"intelligence": str(m.hero.intelligence),
                            "strength": str(m.hero.strength),
                                "speed": str(m.hero.speed),
                                "durability": str(m.hero.durability),
                                "power": str(m.hero.power),
                                "combat": str(m.hero.combat)},
            "hero_connections": str(json.dumps((m.hero.connections))),
            "hero_publisher": str(json.dumps(m.hero.publisher))})

    prompt = f"""
        You are an assistant that generates structured JSON responses ONLY.
        Do not include any text outside JSON.
        Do not include explanations outside JSON.
        Do not use markdown.

        Task:
        Based on the provided superhero details, generate a recommended team summary.

        Rules:
        - Team name, description, and explanation MUST be derived from the given hero details.
        - Do NOT invent heroes or abilities.
        - Keep language concise, clear, and professional.
        - team_strength MUST be exactly one of: "strong", "average", "weak"
        - Respond with VALID JSON only.

        Superhero Details:
        {json.dumps(hero_details, ensure_ascii=False)}

        Team Type:
        {team.team_type}

        Required JSON format:
        {{
          "name": "A short, creative team name that reflects the heroes",
          "description": "1–2 sentences summarizing the team theme and style",
          "explanation": "1–2 sentences explaining why this team works well together based on the heroes' strengths and weaknesses",
          "team_strength": "strong | average | weak"
        }}

        Return ONLY the JSON object.
    """

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
    }

    resp = requests.post(
        f"{OLLAMA_URL}/api/generate",
        json=payload,
    )

    resp.raise_for_status()
    return json.loads(resp.json()["response"])
