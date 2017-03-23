import React from 'react';
import PathSeq from 'pathseg';
import Matter from 'matter-js';
import $ from 'jquery';

class Scene extends React.Component {

    componentDidMount() {
        // create an engine
        const engine = Matter.Engine.create();

        // create a renderer
        const render = Matter.Render.create({
            element: this.sceneElement,
            engine: engine,
            options: {
                width: this.props.width,
                height: this.props.height
            }
        });


        const self = this;
        const svgFile = 'https://shared.chemaxon.com/users/akovacs76/svg/logo_segments.svg';
        $.get(svgFile).done(function(data) {
            var vertexSets = [];

            console.log(window.decomp);

            $(data).find('path').each(function(i, path) {
                vertexSets.push(Matter.Svg.pathToVertices(path, 30));
            });

            const convertedVertexSets = vertexSets.map(vertexSet => vertexSet.map( wertex => ({
                x: wertex.x*10,
                y: wertex.y*10
            })));


            console.log('WSET',vertexSets);
            const logo = Matter.Bodies.fromVertices(self.props.width/2, self.props.height/2, convertedVertexSets, {
                isStatic: true,
                render: {
                    fillStyle: '#2e2b44',
                    strokeStyle: '#2e2b44',
                    lineWidth: 1
                }
            }, true);

            Matter.World.add(engine.world, logo);

            /*var bodyOptions = {
                frictionAir: 0,
                friction: 0.0001,
                restitution: 0.6
            };

            World.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
                if (Query.point([terrain], { x: x, y: y }).length === 0) {
                    return Bodies.polygon(x, y, 5, 12, bodyOptions);
                }
            }));*/
        });

        // create two boxes and a ground
        const balls = [];

        for (let i = 0; i<10; i++) {
            balls.push(Matter.Bodies.circle(this.props.width/2, i*10+30, 6));
        }
        Matter.World.add(engine.world, balls);

        const ground = Matter.Bodies.rectangle(this.props.width/2, this.props.height, this.props.width, 10, {isStatic: true});
        Matter.World.add(engine.world, [ground]);

        // run the engine
        Matter.Engine.run(engine);

        // run the renderer
        Matter.Render.run(render);

        window.addEventListener('deviceorientation', function(event) {
            const orientation = window.orientation;
            const gravity = engine.world.gravity;

            if (orientation === 0) {
                gravity.x = Matter.Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(event.beta, -90, 90) / 90;
            } else if (orientation === 180) {
                gravity.x = Matter.Common.clamp(event.gamma, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(-event.beta, -90, 90) / 90;
            } else if (orientation === 90) {
                gravity.x = Matter.Common.clamp(event.beta, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(-event.gamma, -90, 90) / 90;
            } else if (orientation === -90) {
                gravity.x = Matter.Common.clamp(-event.beta, -90, 90) / 90;
                gravity.y = Matter.Common.clamp(event.gamma, -90, 90) / 90;
            }
        }, true);
    }

    render() {
        return (
            <div
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    border: '1px solid blue',
                    margin: '0 auto'
                }}
                ref={(e) => this.sceneElement = e}>
            </div>
        );
    }
}

Scene.propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
};
export default Scene;
