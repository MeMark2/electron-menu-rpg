// @flow

/*
  This parser only recognizes 3 types of inputs:
    Comments:
      Lines ignored by the parser.
      Single-line comments start when a line starts like this: "\//"
      Multi-line comments start when a line starts like this: "\//>"
      Multi-line comments end when a line starts like this: "\//<"
      Any lines within multi-line comments are ignored along with the start and end lines.

    Commands:
      Command line style single-line commands to be executed by the system.
      Commands start with "\" and have text immediately after (ex. "\define")
        but aren't one of the following: "\//", "\//>", "\//<", "\\".

    Text:
      Arbitrary text to be used as content.
      Lines of text are group into chunks that are only split by commands (but not comments)
      If a "\" is ever desired to be used as text content at the beginning of a line, it can
        be escaped like so: "\\".

  After parsing, it returns an array of text groups and commands. Text groups are returned as
  strings and commands are returned as their own arrays of strings split by whitespace.
*/

import stringArgv from 'string-argv';

const slCommentRgx = /^\\\/\//;
const mlCommentStartRgx = /^\\\/\/>/;
const mlCommentEndRgx = /^\\\/\/</;

const commandRgx = /^\\(?!(\\|\/\/>|\/\/<|\/\/)).*/;

const escapedCommandStartRgx = /^\\\\/;
const escapedCommandStartResult = '\\';

function createTextGroup(textGroupLines: Array<string>): string {
  return textGroupLines.join('\n').trim();
}

function sceneScriptParser(scriptText: string): Array<string | Array<string>> {
  const lines = scriptText.split(/\r\n|\r|\n/);
  const parsed = [];

  // Split script into commands and text
  let isMultilineComment = false;
  let textGroupLines = [];
  lines.forEach(line => {
    if (isMultilineComment) {
      // If we're in a multi-line comment, don't use the line.
      if (mlCommentEndRgx.test(line)) {
        // Close the multi-line comment if the comment close token matches.
        isMultilineComment = false;
      }
    } else if (mlCommentStartRgx.test(line)) {
      // Check if a multi-line comment is being started and line is ignored.
      isMultilineComment = true;
    } else if (!slCommentRgx.test(line)) {
      // If the line is not a single-line comment, parse it.
      if (commandRgx.test(line)) {
        // If it's a command

        // add any previous text group
        if (textGroupLines.length) {
          const textGroup = createTextGroup(textGroupLines);
          if (textGroup) {
            parsed.push(textGroup);
          }
          textGroupLines = [];
        }

        // add the command (parsed like argv variables)
        parsed.push(stringArgv(line));
      } else if (escapedCommandStartRgx.test(line)) {
        // Escape the command start if appropriate and add the text line to the group.
        textGroupLines.push(
          line.replace(escapedCommandStartRgx, escapedCommandStartResult)
        );
      } else {
        // Add the text line to the group.
        textGroupLines.push(line);
      }
    }
  });

  // Add any remaining text group
  if (textGroupLines.length) {
    const textGroup = createTextGroup(textGroupLines);
    if (textGroup) {
      parsed.push(textGroup);
    }
  }

  return parsed;
}

export default sceneScriptParser;
