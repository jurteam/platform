#!/bin/bash

destination=src/components/${1}/${2}

function storyTemplate () {
  Component=$1
  cat << EOM
import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ${Component} from './';

storiesOf('${Component}', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add('Sample [Auto]', () => (<${Component} />));
EOM
}

echo "creating react comonent $destination"
mkdir -p $destination

pushd $destination
touch ${2}.scss

echo "import React from 'react';
import './${2}.scss';
const ${2} = () =>
export default ${2};" >> ${2}.js

echo "import ${2} from './${2}';
export default ${2};" >> index.js

if [ $1 == "common" ]
  then
    while read line
      do
        echo $line >> ${2}.stories.js
      done < <(storyTemplate $2)
fi

echo "created $(ls)"
popd