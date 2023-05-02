import { ContainerLayoutProps } from '../../types/userTypes';
import { Splitter, SplitterPanel } from 'primereact/splitter';


export default function ContainerLayout({ children }: ContainerLayoutProps) {

  const [component1, component2] = children;

  return (
    <Splitter layout="vertical" style={{ height: '95vh' }}>
      <SplitterPanel size={60}>{component1}</SplitterPanel>
      <SplitterPanel size={40}>{component2}</SplitterPanel>
    </Splitter>
  );
}