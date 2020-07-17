#!/bin/bash

component=${*: -1:1} # last argument
typeOfComponent="common"
shouldMakeStory=false
appFolder=""
destination=src/components/${typeOfComponent}/${component}

function usage () {
  message=$(cat << 'EOM'

scaffolds react component creation.

USAGE:

bin/create_react_component.sh options component

ARGUMENTS:

component ⇒ It's the name of react component. 
    A folder with this name will be created with files with the same name.
    For example: if component name is TopNav,
    files will be:
      TopNav/index.js
      TopNav/TopNav.js
      TopNav/TopNav.scss
      TopNav/TopNav.stories.js

OPTIONS:

-s ⇒ Creates a story for the component ".stories.js"

-c ⇒ Creates a common component in "src/common"

-a ⇒ Creates a app-specific component in "src/app-specific". 
    It takes folder name as value. For example: -a OathKeeper
EOM
)

  while read line
  do
    echo $line
  done < "$message"
}

function storyTemplate () {
  Component=$1
  cat << EOM
import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import ${Component} from './';

storiesOf('${Component}', module)
  .addDecorator(withInfo)
  .addParameters({info: {inline: true,header: false}})
  .add('Sample [Auto]', () => (<${Component} />));
EOM
}

while getopts ":hca:s" options
do
  case $options in
    c)
    echo "✓ story"
    echo "✓ common"
    shouldMakeStory=true
    typeOfComponent="common"
    destination=src/components/common/${component}
    ;;
    a)
    echo "✓ app-specific $OPTARG"
    typeOfComponent="app-specific"
    destination=src/components/app-specific/$OPTARG/${component}
    ;;
    s)
    echo "✓ story"
    shouldMakeStory=true
    ;;
    h)
    echo $(usage)
    exit 0
    ;;
    :)
    echo "argument $OPTARG"
    ;;
    *)
    echo "unrecognized $option"
    ;;
  esac
done


echo "creating react component $destination"
mkdir -p $destination

pushd $destination
touch ${component}.scss

echo "import React from 'react';
import './${component}.scss';
const ${component} = () =>
export default ${component};" >> ${component}.js

echo "import ${component} from './${component}';
export default ${component};" >> index.js

if [ ${shouldMakeStory} == true ]
  then
    while read line
      do
        echo $line >> ${component}.stories.js
      done < <(storyTemplate $component)
fi

echo "created $(ls)"
popd