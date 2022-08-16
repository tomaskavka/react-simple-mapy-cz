# React Simple Mapy.cz
![Unit tests](https://github.com/tomaskavka/react-simple-mapy-cz/actions/workflows/unit-tests.yml/badge.svg)
 ![Linter](https://github.com/tomaskavka/react-simple-mapy-cz/actions/workflows/linter.yml/badge.svg)
 [![codecov](https://codecov.io/gh/tomaskavka/react-simple-mapy-cz/branch/main/graph/badge.svg?token=OMdqIJe8u3)](https://codecov.io/gh/tomaskavka/react-simple-mapy-cz)

Mapy.cz for React, easy to lazy load

## Getting started
### Install
`npm install --save react-simple-mapy-cz`

or

`yarn add react-simple-mapy-cz`

### Use it
```javascript
import Map from 'react-simple-mapy-cz';

...

<Map style={{ width: 400, height: 400 }} center={{ lat: 50.0674706, lon: 14.4715394 }} />
```
[Demo](https://tomaskavka.github.io/react-simple-mapy-cz/?path=/story/examples-full-api--basic)

### Another examples
More examples is in `examples` dir and you can explore [Storybook](https://tomaskavka.github.io/react-simple-mapy-cz/
).

## Mapy.cz docs
[Mapy.cz Docs (in Czech)](https://api.mapy.cz/doc/)

> **For English developers**: Mapy.cz documentation is only available in Czech.

## Tips
### Tailwind
Pokud na projektu používáte Tailwind, musíte si do `tailwind.css` přidat následující kód, jinak nebudou mapové podklady viditelné
```
/* Mapy.cz */
.smap img {
  max-width: none;
}
```
