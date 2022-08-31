import React from 'react'
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import "rsuite/dist/rsuite.css";

const RsuiteTest = () => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div className="w-60 h-full shadow-md bg-gray-100 border-r border-gray-300 px-1 top-0 fixed">
      {/* style={{ width: 240 }} */}
      <Sidenav className="bg-blue-900" appearance="default" expanded={expanded} defaultOpenKeys={["3", "4"]}>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
        />
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Inserir Vetor
            </Nav.Item>
            <Nav.Menu
              placement="rightStart"
              eventKey="3"
              title="Inserir Transformações"
              icon={<ArrowLeft />}
            >
              <Nav.Item eventKey="3-1">Padrão</Nav.Item>
              <Nav.Item eventKey="3-2">Reflexão</Nav.Item>
              <Nav.Item eventKey="3-3">Contração</Nav.Item>
              <Nav.Item eventKey="3-4">Expansão</Nav.Item>
              <Nav.Item eventKey="3-5">Cisalhamento</Nav.Item>
            </Nav.Menu>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Executar Transformações
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        
      </Sidenav>
    </div>
  );
}

export default RsuiteTest