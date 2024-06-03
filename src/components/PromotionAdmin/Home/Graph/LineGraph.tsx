import React from 'react';
import { ResponsiveLine } from '@nivo/line';

type LineGraphProps = {
  data: { x: string; y: number }[];
  division: 'view' | 'request';
};

const LineGraph = ({ data, division }: LineGraphProps) => {
  const colors = division === 'request' ? ['#0064FF'] : ['#E16262'];

  return (
    <div style={{ height: '300px', width: '530px' }}>
      <ResponsiveLine
        data={[{ id: 'count', data }]}
        colors={colors}
        margin={{ top: 10, right: 30, bottom: 50, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat={(value) => Math.round(Number(value)).toString()}
        curve='linear'
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
          tickValues: 5,
          format: (value) => Math.round(value).toString(),
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
                background: '#ffffff80',
                backdropFilter: 'blur(20px)',
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                zIndex: 20,
              }}
            >
              <div style={{ fontSize: '0.9em', fontFamily: 'pretendard-medium' }}>
                <strong>{tooltip.point.data.xFormatted}</strong>
              </div>
              <div style={{ marginTop: '5px', fontFamily: 'pretendard-semibold' }}>
                {division === 'request' ? '문의 수' : '조회 수'} {Math.round(Number(tooltip.point.data.y))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LineGraph;
