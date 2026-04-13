# snapshot-lite

Helper minimalista de snapshot testing que salva e compara estados serializados em arquivos.

## Instalacao

```bash
npm install snapshot-lite
```

## Uso

```ts
import { matchSnapshot } from "snapshot-lite";

const result = matchSnapshot("user-response", { id: 1, name: "Ana" });
if (!result.pass) throw new Error(result.diff);
```

Defina `UPDATE_SNAPSHOTS=1` para atualizar os snapshots.

## API

- `matchSnapshot(name, value, opts?)` compara valor contra snapshot salvo
- Opcoes: `dir` (diretorio), `update` (forca reescrita)
- Snapshots sao salvos em `__snapshots__/` por padrao

## Licenca

MIT (c) 2026 Tox
