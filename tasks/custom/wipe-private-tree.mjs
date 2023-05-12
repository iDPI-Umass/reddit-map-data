import FS from "node:fs/promises";
import { getArgs } from "../environment.mjs";

let count = 0;

const getTree = async function ( name ) {
  const path = `data/RC_${ name }.json`;
  return JSON.parse( await FS.readFile( path, { encoding: "utf8" }) );
};

const putTree = async function ( name, data ) {
  const path = `data/RC_${ name }.json`;
  await FS.writeFile( path, JSON.stringify(data) );
};

const getMetadata = async function ( name ) {
  const path = `data/metadata/${ name }.json`;
  return JSON.parse( await FS.readFile( path, { encoding: "utf8" }) );
}

const _wipe = async function ( node ) {
  if ( node.children != null ) {
    for ( const child of node.children ) {
      await _wipe( child );
    }
  }

  if ( node.subreddit != null ) {
    try {
      const metadata = await getMetadata( node.subreddit );
      if ( metadata.type === "private" ) {
        node.isPrivate = true;
      }
    } catch (error) {
      // console.log(node.subreddit);
      count++;
    }
  }
}

const wipe = async function ( tree ) {
  for ( const child of tree.children ) {
    await _wipe( child )
  }
};

const wipePrivateTree = async function () {
  const { month } = getArgs(); 
  const tree = await getTree( month );
  await wipe( tree );
  await putTree( month, tree );
  console.log( "number of unknown subreddits:", count );
}


export { wipePrivateTree }