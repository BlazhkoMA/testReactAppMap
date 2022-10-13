import React, {useCallback, useEffect, useRef, useState} from 'react';

const createItems = (items) => {
    return items.map((item) => ({
        item: item,
        ref: useRef()
    }));
};

const ResizeController = ({children}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const element = useRef(null);
    const items = createItems(children);

    useEffect(() => {
        element.current.style.gridTemplateColumns = `${new Array(children.length).fill(null).map((_, index) => {
            return '1fr';
        }).join(' ')}`;
        setLoaded(true)
    }, []);

    const mouseDown = (index) => {
        setActiveIndex(index);
    };

    const mouseMove = useCallback(
        (e) => {
            const gridColumns = items.map((col, i) => {
                if (i === activeIndex) {
                    const width = e.clientX - col.ref.current.offsetLeft;
                    if (width >= 120) {
                        return `${width}px`;
                    }
                }
                return `1fr`;
            });

            element.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
            window.resize()
        },
        [activeIndex, items]
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <div className="resize-container" ref={element}>
            {items.map(({ ref, item }, i) => (
                <div ref={ref} key={i} className="resize-item">
                    {
                        loaded && item
                    }
                    {
                        i !== (items.length - 1) &&
                        <div
                            onMouseDown={() => mouseDown(i)}
                            className={`resize-handle ${
                                activeIndex === i ? "active" : "idle"
                            }`}
                        />
                    }
                </div>
            ))}
        </div>
    );
};

export default ResizeController;