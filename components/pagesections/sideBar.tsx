import { Box, ChevronDown } from "react-feather";
import BarItem from "../ui/barItem";

const SideBar = ({sideBarStyle, sideBarRef}) => {
  // const sideBarRef = useRef(null);
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSideBar = (event: any) => {
  //   event.preventDefault();
  //   if (isOpen) {
  //     sideBarRef.current.style.width = "0px";
  //   } else {
  //     sideBarRef.current.style.width = "250px";
  //   }
  //   setIsOpen(!isOpen);
  // };

  return (
    <nav
      // className={sidebarClass}
      ref={sideBarRef}
      style={sideBarStyle}
      className="
        w-60 h-full px-1 top-0 left-0 fixed shadow-md   
        bg-gray-100 border-r border-gray-300 overflow-hidden
      "
      // dark:bg-darklight dark:border-black
    >
      <ul className="relative">
        <BarItem
          title={"Inserir Vetor"}
          Icon={<Box />}
        />
        <BarItem
          title={"Inserir Transformações"}
          Icon={<ChevronDown />}
          subItems={[
            "Transformação Padrão",
            "Reflexão",
            "Cisalhamento",
            "Contração",
            "Expansão",
          ]}
        />
        <BarItem
          title={"Executar Transformações"}
          Icon={<Box />}
        />
      </ul>
    </nav>
    
  );
};

export default SideBar;
