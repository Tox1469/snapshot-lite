[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/snapshot-lite/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/snapshot-lite/actions)
[![License](https://img.shields.io/github/license/Tox1469/snapshot-lite?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/snapshot-lite?style=flat-square)](https://github.com/Tox1469/snapshot-lite/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/snapshot-lite?style=flat-square)](https://github.com/Tox1469/snapshot-lite/stargazers)

---

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