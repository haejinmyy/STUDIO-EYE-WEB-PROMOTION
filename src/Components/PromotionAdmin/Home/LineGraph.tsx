import React from 'react';
import { ResponsiveLine } from '@nivo/line';

type LineGraphProps = {
  data: { x: string; y: number }[];
  division: 'view' | 'request';
};

const LineGraph = ({ data, division }: LineGraphProps) => {
  const colors = division === 'request' ? ['#0064FF'] : ['#E16262'];
  return (
    <div style={{ height: '330px', width: '550px' }}>
      <ResponsiveLine
        data={[{ id: 'count', data }]}
        colors={colors}
        margin={{ top: 10, right: 30, bottom: 50, left: 30 }}
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
        enablePoints={true}
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
              <div style={{ marginTop: '5px', fontFamily: 'pretendard-semibold' }}>
                {division === 'request' ? '의뢰 수' : '조회 수'} {Math.round(Number(tooltip.point.data.y))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LineGraph;
