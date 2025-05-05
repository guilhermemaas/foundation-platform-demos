# zabbix-mcp-llm

Projeto para análise de dimensionamento de servidores via Zabbix, utilizando MCP (Model Context Protocol) e integração com LLM (OpenAI) e Discord.

## Componentes
- **MCP Server**: API FastAPI que expõe dados do Zabbix para consumo por LLM.
- **Agente LLM**: Cliente Python que consome o MCP, analisa dados e envia relatório para Discord.
- **Containers**: Cada componente roda em seu próprio container Docker.

## Fluxo
1. MCP consulta API do Zabbix e expõe endpoints.
2. Agente consome MCP, analisa dados de CPU/memória dos hosts em um período informado.
3. Agente gera planilha e envia para canal do Discord.

## Como rodar
Em breve: instruções de uso com Docker Compose. 