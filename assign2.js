/**
 * Author: Erl John Lydzustre
 * Project: Asg2 - 
 */

const EXIST = 0;
const PLAY = 1;
const KEY = 0;
const VALUE = 1;

const api = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';

const plays_content = JSON.parse(plays);
//console.log(plays_content); //test



/**
 *    [
 *      [id = '__', play_text = {title: , ...}]
 *      ...
 *      ... 
 *    ]
 */
var plays_text = [];
var index = 0;



/*
 To get a specific play, add play's id property (in plays.json) via query string, 
   e.g., url = url + '?name=hamlet';
 
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=macbeth
 
 NOTE: Only a few plays have text available. If the filename property of the play is empty, 
 then there is no play text available.
*/


/* note: you may get a CORS error if you test this locally (i.e., directly from a
   local file). To work correctly, this needs to be tested on a local web server.  
   Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
   use built-in Live Preview.
*/

/**
 *  This function creates a new tag and adds the element with it then returns it to
 *  the caller.
 *  Param:
 *     tag:STRING <"tag name">
 *        
 *     elements:BINARY ARRAY 
 *        [
 *         ["key": "value"],
 *          ... 
 *          ...
 *        ]
 * 
 *  return: <"tag name" , elements..> </>
 */
function create_tag(tag_name, elements) {
  let elem;
  let val;
  let tag = document.createElement(tag_name);
  for (let i in elements) {
    elem = elements[i][KEY];
    val = elements[i][VALUE];
    if (elem == 'text_node') {
      tag.appendChild(document.createTextNode(val));
    } else if (elem == 'id') {
      tag.setAttribute('id', val);
    } else if (elem == 'value') {
      tag.setAttribute('value', val);
    } else if (elem == 'type') {
      tag.setAttribute('type', val)
    } else if (elem == 'placeHolder') {
      tag.setAttribute('placeHolder', val)
    } else if (elem == 'idType') {
      tag.setAttribute('idType', val)
    } else if (elem == 'index') {
      tag.setAttribute('index', val)
    } else if (elem == 'position') {
      tag.setAttribute('position', val)
    } else if (elem == 'player') {
      tag.setAttribute('player', val)
    } else if (elem == 'desc') {
      tag.setAttribute('desc', val)
    } else if (elem == 'class') {
      tag.setAttribute('class', val)
    } else if (elem == 'div') {
      tag.setAttribute('div', val)
    }
  }
  return tag;
}

function display_available_plays() {
  var interface = document.getElementById('interface');
  interface.hidden = true;

  var button = document.getElementById('btnAside');
  button.style.visibility = 'hidden';

  var play_here = document.getElementById('playHere');
  play_here.hidden = true;

  var play_list = document.getElementById('ulPlayList');
  play_list.innerHTML = '';
  var li;
  for (let i in plays_content) {
    li = document.createElement('li');
    li.setAttribute('id', plays_content[i].id);
    li.setAttribute('likely-date', plays_content[i].likelyDate);
    li.appendChild(document.createTextNode(plays_content[i].title));
    play_list.appendChild(li);
  }
  //console.log(play_list); //test
  return play_list;
}

function display_available_plays_by_name() {

  var play_list = display_available_plays();
  play_list = sortList(play_list, 'sort_by_title');
}

function display_available_plays_by_date() {
  console.log("sort by date");
  var play_list = display_available_plays();
  play_list = sortList(play_list, 'sort_by_likely-date');
}

function get_item_from_plays_content(id, item) {

  for (let i in plays_content) {
    if (id == plays_content[i].id) {
      switch (item) {
        case 'filename':
          return plays_content[i].filename;
        case 'title':
          return plays_content[i].title;
        case 'likelyDate':
          return plays_content[i].likelyDate;
        case 'genre':
          return plays_content[i].genre;
        case 'wiki':
          return plays_content[i].wiki;
        case 'gutenberg':
          return plays_content[i].gutenberg;
        case 'shakespeareOrg':
          return plays_content[i].shakespeareOrg;
        case 'synopsis':
          return plays_content[i].synopsis;
        case 'desc':
          return plays_content[i].desc;
      }
    }
  }
}

function set_selected_play(id) {
  let elements;
  // remove content inside synopsis
  let interface = document.getElementById('interface');
  interface.hidden = false;
  interface.innerHTML = '';

  // add title into interface
  let h2_play_title = document.createElement('h2');
  let h2_title = get_item_from_plays_content(id, 'title');
  h2_play_title.appendChild(document.createTextNode(h2_title));
  interface.appendChild(h2_play_title);

  // add synopsis into interface
  let synopsis = document.createElement('h4');
  let synopsis_from_content = get_item_from_plays_content(id, 'synopsis');
  synopsis.appendChild(document.createTextNode(synopsis_from_content));
  interface.appendChild(synopsis);
  console.log(h2_play_title);

  // change interface-button_close = View Play Text  
  let button = document.getElementById('btnAside');
  button.style.visibility = 'visible';
  button.innerHTML = '';
  button.setAttribute('idtype', 'btnView');
  button.appendChild(document.createTextNode('View Play Text'));
  console.log(button); //test

  // remove content inside section
  let section = document.getElementById('playHere');
  section.hidden = false;
  section.innerHTML = '';

  // add likely date into playHere
  let str = get_item_from_plays_content
  let selected_play_details = document.createElement('h5');
  str = document.createTextNode(get_item_from_plays_content(id, 'likelyDate'));
  selected_play_details.appendChild(str);
  section.appendChild(selected_play_details);

  //selected_play_details = document.createElement('br');
  //section.appendChild(selected_play_details);

  selected_play_details = document.createElement('h5');
  str = document.createTextNode(get_item_from_plays_content(id, 'genre'));
  selected_play_details.appendChild(str);
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('a');
  str = get_item_from_plays_content(id, 'wiki');
  selected_play_details.setAttribute('href', str);
  selected_play_details.innerHTML = str;
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('br');
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('a');
  str = get_item_from_plays_content(id, 'gutenberg');
  selected_play_details.setAttribute('href', str);
  selected_play_details.innerHTML = str;
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('br');
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('a');
  str = get_item_from_plays_content(id, 'shakespeareOrg');
  selected_play_details.setAttribute('href', str);
  selected_play_details.innerHTML = str;
  section.appendChild(selected_play_details);

  selected_play_details = document.createElement('h5');
  str = document.createTextNode(get_item_from_plays_content(id, 'desc'));
  selected_play_details.appendChild(str);
  section.appendChild(selected_play_details);

  //console.log(section); //test
}

/**
 * return:
 *  [0]: return true if the play is stored inside the plays_text, false otherwise
 *  [1]: returns the play text 
 */
function is_play_stored(play) {
  for (let i in plays_text) {
    if (plays_text[i].id == play) {
      return [true, plays_text[i].play_text]
    }
  }
  return [false, 'not found'];
}

function check_selection(selection) {
  for (let i in selection) {
    if (selection[i].selected) {
      return selection[i];
    }
  }
}

/**
 *  stores/loads the plays into plays_text[]
 * 
 *    [
 *      [id = '__', play_text = {title: , ...}]
 *      ...
 *      ... 
 *    ]
 */
async function loadPlays(play, is_play) {

  let play_text;
  if (is_play[EXIST]) {
    play_text = is_play[PLAY];
    console.log("play stored"); //test
  } else {
    const response = await fetch(api + '?name=' + play);
    play_text = await response.json();
    plays_text[index] = { 'id': play, play_text };
    index++;
    console.log("play not stored"); //test
  }
  console.log(plays_text); //test

  console.log(play_text); //test
  if (play_text.message) {
    let elements;
    let interface = document.getElementById('interface');
    interface.innerHTML = '';

    elements = [['text_node', 'No Play Is Found']];
    interface.appendChild(create_tag('h2', elements));

  } else {
    //interface
    let elements;
    let interface = document.getElementById('interface');
    interface.innerHTML = '';

    elements = [['text_node', play_text.title]];
    interface.appendChild(create_tag('h2', elements));

    elements = [['id', "actList"]];
    let select_act = create_tag('select', elements);
    interface.appendChild(select_act);

    elements = [['id', "sceneList"]];
    let select_scene = create_tag('select', elements);
    interface.appendChild(select_scene);

    elements = [];
    let inner_fieldset = create_tag('fieldset', elements);
    interface.appendChild(inner_fieldset);

    elements = [['id', 'playerList']];
    let inner_select = create_tag('select', elements);
    inner_fieldset.appendChild(inner_select);

    elements = [['value', 0], ['text_node', 'All Players']];
    let inner_option = create_tag('option', elements);
    inner_select.appendChild(inner_option);

    elements = [['type', 'text'], ['id', 'txtHighlight'], ['placeHolder', 'Enter a search term']];
    inner_fieldset.appendChild(create_tag('input', elements));

    elements = [['id', 'btnHighlight'], ['text_node', 'Filter']];
    inner_fieldset.appendChild(create_tag('button', elements));

    let play_here = document.getElementById('playHere');

    // add ACTS to selection
    let option;
    let act;
    for (let i in play_text.acts) {
      act = play_text.acts[i].name;
      elements = [['id', act], ['text_node', act], ['index', i]];
      option = create_tag('option', elements);
      select_act.appendChild(option);
    }

    // ACT SELECTION -GENERATES SCENE
    let selected_act;
    let index_act;
    let click_act = document.getElementById('actList');
    click_act.addEventListener('click', function (e) {
      selected_act = check_selection(click_act);

      select_scene.innerHTML = '';
      let scene;
      index_act = selected_act.getAttribute('index');
      for (let i in play_text.acts[index_act].scenes) {
        scene = play_text.acts[index_act].scenes[i].name;
        elements = [['id', scene], ['text_node', scene], ['index', i]];
        option = create_tag('option', elements);
        select_scene.appendChild(option);
      }
      index_act++;
    });

    // SCENE SELECTION -GENERATES PERSONAL
    let selected_scene;
    let click_scene = select_scene;
    click_scene.addEventListener('click', function (e) {
      selected_scene = check_selection(click_scene);

      let select_player_list = inner_select;
      select_player_list.innerHTML = '';
      let persona;
      for (let i in play_text.persona) {
        persona = play_text.persona[i];
        if (index_act == persona.position) {
          elements = [
            ['position', persona.position],
            ['player', persona.player],
            ['desc', persona.desc],
            ['text_node', persona.player]
          ];
          option = create_tag('option', elements);
          select_player_list.appendChild(option);
        }
      }
      view_play_here();
      console.log(selected_act); //test
      console.log(selected_scene); //test
    });

    let selected_persona;
    let click_persona = inner_select;
    click_persona.addEventListener('click', function (e) {
      selected_persona = check_selection(click_persona);
      console.log(selected_persona);
    });

    // SEARCH WORD HIGHTLIGHT EVENT
    let input_term = document.getElementById('txtHighlight');
    input_term.addEventListener('input', function (e) {
      input_term.setAttribute('placeholder', e.target.value);
      console.log(input_term); //test
    });

    // FILTER EVENT
    let click_filter = document.getElementById('btnHighlight');
    click_filter.addEventListener('click', function (e) {
      console.log(click_filter);
    });
  }


  function view_play_here() {
    // show ACT and SCENE
    play_here.innerHTML = '';
    elements = [['text_node', play_text.title]];
    play_here.appendChild(create_tag('h2', elements));

    elements = [['id', 'actHere']];
    let article_act_here = create_tag('article', elements);
    play_here.appendChild(article_act_here);

    elements = [['text_node', selected_act.id]];
    article_act_here.appendChild(create_tag('h3', elements));

    elements = [['id', 'sceneHere']];
    let div_scene_here = create_tag('div', elements);
    article_act_here.appendChild(div_scene_here);

    elements = [['text_node', selected_scene.id]];
    div_scene_here.appendChild(create_tag('h4', elements));

    let act_number = selected_act.getAttribute('index');
    let scene_number = selected_scene.getAttribute('index');
    let scenes_title = play_text.acts[act_number].scenes[scene_number].title;
    elements = [['class', 'title'], ['text_node', scenes_title]];
    article_act_here.appendChild(create_tag('p', elements));

    let stage_direction = play_text.acts[act_number].scenes[scene_number].stageDirection;
    elements = [['class', 'direction'], ['text_node', stage_direction]];
    article_act_here.appendChild(create_tag('p', elements));

    for (let i in play_text.acts[act_number].scenes[scene_number].speeches) {
      elements = [['class', 'speech']];
      let div_speech = create_tag('div', elements);
      article_act_here.appendChild(div_speech);

      let speaker_name = play_text.acts[act_number].scenes[scene_number].speeches[i].speaker;
      elements = [['text_node', speaker_name]];
      div_speech.appendChild(create_tag('span', elements));

      let speaker_lines = play_text.acts[act_number].scenes[scene_number].speeches[i].lines;
      elements = [['text_node', speaker_lines]];
      div_speech.appendChild(create_tag('p', elements));
    }

    console.log(article_act_here); //test
    console.log(play_text); //test
  }


  console.log(interface); //test
}

function set_view_play_text(play) {

  let found = is_play_stored(play);
  console.log(found); //test
  return loadPlays(play, found);
}


document.addEventListener('DOMContentLoaded', async () => {

  //#3
  //initial display: sorted name
  //event: radio: sorted name | sorted likely date
  //add icon to plays with text available ------------------------------->(TODO)

  display_available_plays_by_name();

  // Sort changes when the radio is selected [by name | by date]
  let radio = document.getElementById('playList');
  radio.addEventListener('change', function (e) {
    let target = e.target;
    switch (target.id) {
      case 'name':
        display_available_plays_by_name();
        break;
      case 'date':
        display_available_plays_by_date();
        break;
    }
  });

  // Prints the content of the selected play on Available Plays
  let play_str;
  let click_available_plays = document.getElementById('ulPlayList');
  click_available_plays.addEventListener('click', function (e) {
    set_selected_play(e.target.id);
    console.log(e.target.id); //test
    play_str = e.target.id;
  });

  let click_view_play_text = document.getElementById('btnAside');
  click_view_play_text.addEventListener('click', function (e) {

    if (click_view_play_text.getAttribute('idtype') == 'btnView') {
      click_view_play_text.innerHTML = '';
      click_view_play_text.appendChild(document.createTextNode('Close'));
      click_view_play_text.setAttribute('idtype', 'btnClose');

      set_view_play_text(play_str);
    } else {
      click_view_play_text.innerHTML = '';
      click_view_play_text.appendChild(document.createTextNode('View Play Text'));
      click_view_play_text.setAttribute('idtype', 'btnView');

      set_selected_play(play_str);
    }
    console.log(click_view_play_text); //test
    console.log(e.target.id); //test
  });

});
