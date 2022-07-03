import { Point } from "./Bezier";

export const C = memorize( ( n: number, k: number ) => factorial( n ) / ( factorial( k ) * factorial( n - k ) ) )

const factorial = memorize( ( n: number ): number => ( n < 2 ? 1 : n * factorial( n - 1 ) ) )

function memorize( func: Function ) {
    const history: any = {}

    return function( ...args: any ) {
        const key = JSON.stringify( args )

        if( !history.hasOwnProperty( key ) ) {
            history[key] = func( ...args )
        }

        return history[key]
    }
}

export const getDistance = ( point: Point, node: Point ) => {
    return ( ( (point.x - node.x) ** 2 + (point.y - node.y) ** 2 ) ** 0.5 )
}