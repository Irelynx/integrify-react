import { useParams } from 'react-router-dom';

export default function Country() {
  const { id } = useParams() as { id: string };
  return <>Country page, id: {id}</>;
}
