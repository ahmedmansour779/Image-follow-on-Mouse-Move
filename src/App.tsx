/* eslint-disable react-hooks/exhaustive-deps */
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();
  const cursor = useRef<HTMLDivElement | null>(null);
  const h1 = useRef<HTMLDivElement | null>(null);

  let posX = 0;
  let posY = 0;
  let mouseX = 0;
  let mouseY = 0;

  useEffect(() => {
    tl.to({}, 0.016, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 10;
        posY += (mouseY - posY) / 10;
        if (cursor.current) {
          tl.set(cursor.current, {
            css: {
              left: posX - 50,
              top: posY - 50,
            }
          });
        }
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    if (h1.current) {
      tl2.from(h1.current.children, {
        skewY: 8,
        y: 100,
        duration: 2,
        delay: 0.3,
        opacity: 0,
        stagger: {
          each: 0.4,
          from: "end"
        }
      });
    }

    if (cursor.current) {
      tl2.from(cursor.current, {
        duration: 1.5,
        delay: 1,
        opacity: 0
      }, "-=1");
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tl, tl2]);

  return (
    <div className='app'>
      <div ref={h1} className="content absolute flex flex-col gap-3 top-[100px] left-[100px] font-bold uppercase font-cairo text-[#ff77f4]">
        <h1 className='text-7xl hover:cursor-crosshair'>ahmed mansour</h1>
        <h1 className='text-7xl hover:cursor-crosshair'>frontend developer</h1>
        <h1 className='text-7xl hover:cursor-crosshair'>freelancer</h1>
      </div>
      <div ref={cursor} className="cursor-follow"></div>
    </div>
  )
}

export default App
