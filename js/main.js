import {getRandom, checkMaxLength} from './utils.js';
import './picDescription.js';

getRandom();


const message = 'Во дни сомнений, во дни тягостных раздумий о судьбах моей родины, — ты один мне поддержка и опора, о великий, могучий, правдивый и свободный русский язык! Не будь тебя — как не впасть в отчаяние при виде всего, что совершается';

checkMaxLength(message, 140);

