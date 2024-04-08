import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Request } from '@/types/request';
import { fetchRequests } from '@/apis/PromotionAdmin/request';

const RequestDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<Request | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = await fetchRequests({ requestId: Number(id) }); // 요청 데이터 가져오기
        setRequest(requestData);
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <h2>Request</h2>
      {request ? (
        <div>
          <p>Request ID: {request.id}</p>
          <p>Request Name: {request.clientName}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RequestDetailPage;
