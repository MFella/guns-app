import {trigger,transition,style,query,animateChild,animate,keyframes, group} from '@angular/animations';


export const fader = 
trigger('routeAnimations', [
    transition('* => Search', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                left:0,
                width: '100%',
                opacity:0,
                transform: 'scale(0) translateY(100%)',
            }),
        ]),
        query(':enter',[
            animate('600ms ease',
                style({opacity: 1, transform: 'scale(1) translateY(0)'})
            ),
        ]),
    ]),
])

export const slider = 
    trigger('routeAnimations', [
        transition('home => isLeft', slideTo('left')),
        transition('home => isRight', slideTo('right')),
        // transition('* => isTop', slideTo('top')),
        // transition('* => isBottom', slideTo('bottom')),
        transition('isRight => home', slideTo('left')),
        transition('isLeft => home', slideTo('right')),
        // transition('isTop => *', slideTo('top')),
        // transition('isBottom => *', slideTo('bottom'))
    ]);

function slideTo(direction)
{
    const optional = {optional: true};
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({[direction]: '-100%'})
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({[direction]: '100%'}))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({[direction]: '0%'}))
            ])
        ])
    ];
}

export const imFaded = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter', [
                style({ opacity: 0 })
            ], { optional: true }
        ),
        group([
            query(':leave', [
                    animate(300, style({ opacity: 0 }))
                ],
                { optional: true }
            ),
            query(':enter', [
                    style({ opacity: 0 }),
                    animate(300, style({ opacity: 1 }))
                ],
                { optional: true }
            )
        ])
    ])
]);

