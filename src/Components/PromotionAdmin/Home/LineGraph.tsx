import React from 'react';
import { ResponsiveLine } from '@nivo/line';

type LineGraphProps = {
  data: { x: string; y: number }[];
};

const LineGraph = ({ data }: LineGraphProps) => {
  return (
    <div style={{ height: '400px', width: '700px' }}>
      <ResponsiveLine
        data={[{ id: 'views', data }]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=' >-.2f'
        curve='cardinal'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        enableTouchCrosshair={true}
        useMesh={true}
        tooltip={(tooltip) => {
          return (
            <div
              style={{
                background: 'rgba(0,0,0,0.01)',
                backdropFilter: 'blur(3px)',
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            >
              <div style={{ fontSize: '0.9em', fontFamily: 'pretendard-medium' }}>
                <strong>{tooltip.point.data.xFormatted}</strong>
              </div>
              <div style={{ marginTop: '5px', fontFamily:'pretendard-semibold' }}>조회수 {Math.round(Number(tooltip.point.data.y))}</div>
            </div>
          );
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineGraph;
