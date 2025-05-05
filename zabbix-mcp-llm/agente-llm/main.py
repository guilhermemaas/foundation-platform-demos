import os
import requests
from datetime import datetime

def main():
    mcp_url = os.getenv("MCP_SERVER_URL", "http://localhost:8000")
    print("Testando conexão com MCP Server...")
    resp = requests.get(f"{mcp_url}/ping")
    print("Resposta do MCP:", resp.json())
    
    # Exemplo de entrada de período
    data_inicio = input("Data início (YYYY-MM-DD): ")
    data_fim = input("Data fim (YYYY-MM-DD): ")
    print(f"Período selecionado: {data_inicio} a {data_fim}")

if __name__ == "__main__":
    main() 