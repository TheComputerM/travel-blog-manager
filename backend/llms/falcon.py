import modal
modelClass = modal.Cls.lookup("falconLLM", "Falcon")

def falcon_gen(title: str, section: str):
  output = modelClass().runModel.remote(title, section)
  return "\n".join(list(map(lambda x: x["generated_text"], output)))