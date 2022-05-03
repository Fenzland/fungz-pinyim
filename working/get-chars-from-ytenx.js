import 'https://better-js.fenz.land/index.js';
import { encode, decode, } from 'https://oxo.fenzland.com/OsO/0.1/text-encoder.js';
import Args from 'https://dragonfly.fenz.land/utils/Args.js';

globalThis.z= ( x, ...a )=> (console.log( x, ...a, new Error().stack.split( /(?=\n)/, )[2], ), x);
globalThis.d= ( x, ...a )=> (console.log( x, ...a, ), Deno.exit());

const args= new Args( ...Deno.args, );

// fix
args.script= args.params.shift();

if( !args.params[0] )
	console.error( '請輸入一個漢字作爲聲母或韻母', );
else
{
	const char= args.params[0];
	const type= (
		args.hasOption( 'c', )
		||
		args.hasOption( 'cjeng', )
	)? 'cjeng': 'yonhmiuk';
	
	const dict= new Set();
	
	(async ()=> {
		const html= await (await fetch( `http://ytenx.org/kyonh/${type}/${char}/`, )).text();
		
		const sieuxGReg= /<a href="\/kyonh\/sieux\/\d+\/">.<\/a>/g;
		const sieuxReg= /<a href="\/kyonh\/sieux\/(\d+)\/">.<\/a>/;
		const sieuxes= html.match( sieuxGReg, ).map( tag=> tag.matchGroup( sieuxReg, 1, ), );
		
		await Promise.all( sieuxes.map( async sieux=> {
			const html= await (await fetch( `http://ytenx.org/kyonh/sieux/${sieux}/`, )).text();
			
			const dzihGReg= /<a href="\/kyonh\/dzih\/\d+\/">.<\/a>/g;
			const dzihReg= /<a href="\/kyonh\/dzih\/\d+\/">(.)<\/a>/;
			const dzihs= html.match( dzihGReg, ).map( tag=> tag.matchGroup( dzihReg, 1, ), );
			
			dzihs.forEach( char=> dict.add( char, ), )
		}, ), );
		
		if( await isCmd( 'chinese-t2s', ) )
		{
			const chars= [ ...dict, ].implode();
			
			(await call( 'chinese-t2s', chars, )).split( '', ).forEach( char=> dict.add( char, ), );
			(await call( 'chinese-s2t', chars, )).split( '', ).forEach( char=> dict.add( char, ), );
		}
		console.log( [ ...dict, ].implode(), );
	})();
}


async function run( ...cmd )
{
	console.log( cmd.join( ' ', ), );
	
	const process= Deno.run( { cmd, }, );
	
	const status= await process.status();
	
	process.close();
	
	return status.code;
}

async function call( ...cmd )
{
	const process= Deno.run( { cmd, stdout:'piped', }, );
	
	const result= decode( await Deno.readAll( process.stdout, ), );
	
	process.stdout.close();
	process.close();
	
	return result;
}

async function test( ...args )
{
	const cmd = [ 'test', ...args, ];
	
	const process= Deno.run( { cmd, stdout:'null', }, );
	
	return (await process.status()).success;
}

async function isCmd( command )
{
	const cmd = [ 'which', command, ];
	
	const process= Deno.run( { cmd, stdout:'null', }, );
	
	return (await process.status()).success;
}

async function echo( ...strings )
{
	return Deno.stdout.write( encode( strings.join( '', ), ), );
}

function abort( ...strings )
{
	console.error( [ '\x1b[31m', strings, '\x1b[0m', ].join( '', ), )
	
	Deno.exit( 1, );
}

