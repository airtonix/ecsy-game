import { ConnectorLineOption, Direction } from './types';

export function populateConnectorSVG(
  svg: SVGElement,
  points: Array<string>,
  lineOptions: Partial<ConnectorLineOption>,
  direction: Direction
) {
  const resolvedOptions: ConnectorLineOption = {
    type: lineOptions.type || 'angled',
    thickness: lineOptions.thickness || 2,
    colour: lineOptions.colour || '#4c4c4c',
    cap: lineOptions.cap || 'square',
  };

  // Function to create a SVG line which represents a connector.
  const drawLine = function (
    x1: number | string,
    y1: number | string,
    x2: number | string,
    y2: number | string
  ) {
    const connector = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    connector.setAttribute('x1', x1.toString());
    connector.setAttribute('y1', y1.toString());
    connector.setAttribute('x2', x2.toString());
    connector.setAttribute('y2', y2.toString());
    connector.setAttribute('stroke', resolvedOptions.colour);
    connector.setAttribute(
      'stroke-width',
      resolvedOptions.thickness.toString()
    );
    connector.setAttribute('stroke-linecap', resolvedOptions.cap);
    svg.appendChild(connector);
  };

  // The draw layouts defining the strategies for drawing connector lines.
  const drawLayouts = {
    horizontal: {
      straight: function () {
        for (let i = 0; i < points.length; i++) {
          drawLine(0, '50%', '105%', points[i]);
        }
      },
      angled: function () {
        drawLine(0, '50%', '50%', '50%');

        for (let i = 0; i < points.length; i++) {
          drawLine('50%', '50%', '50%', points[i]);
          drawLine('50%', points[i], '100%', points[i]);
        }
      },
    },
    vertical: {
      straight: function () {
        for (let i = 0; i < points.length; i++) {
          drawLine('50%', '0%', points[i], '100%');
        }
      },
      angled: function () {
        drawLine('50%', '0%', '50%', '50%');

        for (let i = 0; i < points.length; i++) {
          drawLine('50%', '50%', points[i], '50%');
          drawLine(points[i], '50%', points[i], '100%');
        }
      },
    },
  };

  // Use the desired strategy to draw the connectors.
  const strategyDirection = drawLayouts[direction];
  const strategy = strategyDirection[resolvedOptions.type];

  strategy();
}
