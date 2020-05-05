#!/bin/bash

echo "creating react comonent src/components/${1}"
mkdir -p src/components/${1}

pushd src/components/${1}
touch ${2}.scss

echo "import React from 'react';
import './${2}.scss';
const ${2} = () =>
export default ${2};" >> ${2}.js

echo "import ${2} from './${2}';
export default ${2};" >> index.js

echo "created $(ls)"
popd