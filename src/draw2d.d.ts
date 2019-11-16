declare namespace draw2d {
    class Canvas {
        constructor(...args: any[]);
        add(figure: any, x: any, y: any): any;
        addSelection(object: any): any;
        calculateConnectionIntersection(): any;
        clear(): any;
        destroy(): void;
        fireEvent(event: any, args: any): void;
        fromCanvasToDocumentCoordinate(x: any, y: any): any;
        fromDocumentToCanvasCoordinate(x: any, y: any): any;
        getAbsoluteX(): any;
        getAbsoluteY(): any;
        getAllPorts(): any;
        getBestFigure(x: any, y: any, blacklist: any, whitelist: any): any;
        getBestLine(x: any, y: any, lineToIgnore: any): any;
        getCommandStack(): any;
        getDimension(): any;
        getDropInterceptorPolicies(): any;
        getFigure(id: any): any;
        getFigures(): any;
        getHeight(): any;
        getHtmlContainer(): any;
        getIntersection(line: any): any;
        getLine(id: any): any;
        getLines(): any;
        getPrimarySelection(): any;
        getScrollArea(): any;
        getScrollLeft(): any;
        getScrollTop(): any;
        getSelection(): any;
        getWidth(): any;
        getZoom(): any;
        hideDecoration(): void;
        init(canvasId: any, width: any, height: any): any;
        installEditPolicy(policy: any): any;
        off(eventOrFunction: any): any;
        on(event: any, callback: any): any;
        onClick(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onDoubleClick(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onDrag(draggedDomNode: any, x: any, y: any): void;
        onDragEnter(draggedDomNode: any): void;
        onDragLeave(draggedDomNode: any): void;
        onDrop(droppedDomNode: any, x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onMouseWheel(wheelDelta: any, x: any, y: any, shiftKey: any, ctrlKey: any): any;
        onRightMouseDown(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        registerPort(port: any): any;
        remove(figure: any): any;
        scrollTo(top: any, left: any): any;
        setCurrentSelection(object: any): any;
        setDimension(dim: any, height: any): any;
        setScrollArea(elementSelector: any): any;
        setScrollLeft(left: any): any;
        setScrollTop(top: any): any;
        setZoom(zoomFactor: any, animated: any): void;
        showDecoration(): void;
        snapToHelper(figure: any, pos: any): any;
        uninstallEditPolicy(policy: any): any;
        unregisterPort(port: any): any;
        static extend: any;
        static inject: any;
    }
    class Corona {
        constructor(...args: any[]);
        init(...args: any[]): any;
        setAlpha(...args: any[]): any;
        static extend: any;
        static inject: any;
    }
    class Figure {
        constructor(...args: any[]);
        add(child: any, locator: any, index: any): any;
        addCssClass(className: any): any;
        applyTransformation(): any;
        attr(name: any, value: any): any;
        clone(cloneMetaData: any): any;
        contains(containedFigure: any): any;
        createCommand(request: any): any;
        createShapeElement(): void;
        delegateTarget(draggedFigure: any): any;
        fireEvent(event: any, args: any): void;
        getAbsoluteBounds(): any;
        getAbsolutePosition(): any;
        getAbsoluteX(): any;
        getAbsoluteY(): any;
        getAlpha(): any;
        getBestChild(x: any, y: any, figureToIgnore: any): any;
        getBoundingBox(): any;
        getCanSnapToHelper(): any;
        getCanvas(): any;
        getChildren(): any;
        getComposite(): any;
        getCssClass(): any;
        getHandleBBox(): any;
        getHeight(): any;
        getId(): any;
        getKeepAspectRatio(): any;
        getMinHeight(): any;
        getMinWidth(): any;
        getParent(): any;
        getPersistentAttributes(): any;
        getPosition(): any;
        getRoot(): any;
        getRotationAngle(): any;
        getSelectionAdapter(): any;
        getShapeElement(): any;
        getSnapToGridAnchor(): any;
        getTopLevelShapeElement(): any;
        getUserData(): any;
        getWidth(): any;
        getX(): any;
        getY(): any;
        getZOrder(): any;
        hasCssClass(className: any): any;
        hitTest(iX: any, iY: any, corona: any): any;
        init(attr: any, setter: any, getter: any): any;
        installEditPolicy(policy: any): any;
        isDeleteable(): any;
        isDraggable(): any;
        isResizeable(): any;
        isSelectable(): any;
        isSelected(): any;
        isStrechable(): any;
        isVisible(): any;
        off(eventOrFunction: any): any;
        on(event: any, callback: any, context: any): any;
        onCatch(droppedFigure: any, x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onClick(): void;
        onContextMenu(x: any, y: any): void;
        onDoubleClick(): void;
        onDrag(dx: any, dy: any, dx2: any, dy2: any, shiftKey: any, ctrlKey: any): void;
        onDragEnd(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onDragEnter(draggedFigure: any): void;
        onDragLeave(draggedFigure: any): void;
        onDragStart(x: any, y: any, shiftKey: any, ctrlKey: any): any;
        onDrop(dropTarget: any, x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onMouseEnter(): void;
        onMouseLeave(): void;
        onPanning(dx: any, dy: any, dx2: any, dy2: any, shiftKey: any, ctrlKey: any): void;
        onPanningEnd(): void;
        onTimer(): void;
        pick(obj: any, var_keys: any, ...args: any[]): any;
        remove(child: any): any;
        removeCssClass(className: any): any;
        repaint(attributes: any): any;
        resetChildren(): any;
        select(asPrimarySelection: any): any;
        setAlpha(percent: any): any;
        setBoundingBox(rect: any): any;
        setCanSnapToHelper(flag: any): any;
        setCanvas(canvas: any): any;
        setComposite(composite: any): any;
        setCssClass(cssClass: any): any;
        setDeleteable(flag: any): any;
        setDimension(w: any, h: any): any;
        setDraggable(flag: any): any;
        setGlow(flag: any): any;
        setHeight(height: any): any;
        setId(newId: any): any;
        setKeepAspectRatio(flag: any): any;
        setMinHeight(h: any): any;
        setMinWidth(w: any): any;
        setParent(parent: any): any;
        setPersistentAttributes(memento: any): any;
        setPosition(x: any, y: any): any;
        setResizeable(flag: any): any;
        setRotationAngle(angle: any): any;
        setSelectable(flag: any): any;
        setSelectionAdapter(adapter: any): any;
        setSnapToGridAnchor(point: any): any;
        setUserData(object: any): any;
        setVisible(flag: any, duration: any): any;
        setWidth(width: any): any;
        setX(x: any): any;
        setY(y: any): any;
        startTimer(milliSeconds: any): any;
        stopTimer(): any;
        toBack(figure: any): any;
        toFront(figure: any): any;
        toggleCssClass(className: any): any;
        translate(dx: any, dy: any): any;
        uninstallEditPolicy(policy: any): any;
        unselect(): any;
        static extend: any;
        static inject: any;
    }
    class HeadlessCanvas {
        constructor(...args: any[]);
        add(figure: any, x: any, y: any): any;
        calculateConnectionIntersection(): void;
        clear(): any;
        fireEvent(event: any, args: any): void;
        getAllPorts(): any;
        getCommandStack(): any;
        getFigure(id: any): any;
        getFigures(): any;
        getLine(id: any): any;
        getLines(): any;
        hideDecoration(): void;
        init(): void;
        off(eventOrFunction: any): any;
        on(event: any, callback: any): any;
        registerPort(port: any): any;
        showDecoration(): void;
        static extend: any;
        static inject: any;
    }
    class HybridPort {
        constructor(...args: any[]);
        createCommand(...args: any[]): any;
        init(...args: any[]): any;
        static extend: any;
        static inject: any;
    }
    class InputPort {
        constructor(...args: any[]);
        createCommand(...args: any[]): any;
        init(...args: any[]): any;
        static extend: any;
        static inject: any;
    }
    class OutputPort {
        constructor(...args: any[]);
        createCommand(...args: any[]): any;
        init(...args: any[]): any;
        static extend: any;
        static inject: any;
    }
    class Port {
        constructor(...args: any[]);
        createCommand(request: any): any;
        fireEvent(...args: any[]): any;
        getConnectionAnchorLocation(referencePoint: any, inquiringConnection: any): any;
        getConnectionAnchorReferencePoint(inquiringConnection: any): any;
        getConnectionDirection(peerPort: any): any;
        getConnections(): any;
        getCoronaWidth(): any;
        getLocator(): any;
        getMaxFanOut(): any;
        getName(): any;
        getPersistentAttributes(...args: any[]): any;
        getSelectionAdapter(): any;
        getValue(): any;
        hitTest(iX: any, iY: any, corona: any): any;
        init(...args: any[]): any;
        onConnect(connection: any): void;
        onDisconnect(connection: any): void;
        onDrag(...args: any[]): any;
        onDragEnd(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onDragStart(x: any, y: any, shiftKey: any, ctrlKey: any): any;
        onDrop(dropTarget: any, x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onMouseEnter(): void;
        onMouseLeave(): void;
        repaint(...args: any[]): any;
        setBackgroundColor(...args: any[]): any;
        setConnectionAnchor(anchor: any): any;
        setConnectionDirection(direction: any): any;
        setCoronaWidth(width: any): void;
        setGlow(flag: any): any;
        setLocator(locator: any): any;
        setMaxFanOut(count: any): any;
        setName(name: any): void;
        setParent(...args: any[]): any;
        setPersistentAttributes(...args: any[]): any;
        setValue(value: any): any;
        static extend: any;
        static inject: any;
    }
    class ResizeHandle {
        constructor(...args: any[]);
        createShapeElement(...args: any[]): any;
        fireEvent(event: any, args: any): void;
        getOwner(): any;
        getSnapToDirection(): any;
        getType(): any;
        hide(): any;
        init(...args: any[]): any;
        onDrag(...args: any[]): any;
        onDragEnd(x: any, y: any, shiftKey: any, ctrlKey: any): void;
        onDragStart(x: any, y: any, shiftKey: any, ctrlKey: any): any;
        onKeyDown(keyCode: any, ctrl: any): void;
        repaint(...args: any[]): any;
        setBackgroundColor(...args: any[]): any;
        setCanvas(...args: any[]): any;
        setDimension(...args: any[]): any;
        setDraggable(...args: any[]): any;
        setOwner(owner: any): any;
        setPosition(x: any, y: any): any;
        setType(type: any): any;
        show(canvas: any): any;
        supportsSnapToHelper(): any;
        updateCursor(shape: any): any;
        static extend: any;
        static inject: any;
    }
    class SVGFigure {
        constructor(...args: any[]);
        createSet(): any;
        getSVG(): any;
        importSVG(canvas: any, rawSVG: any): any;
        init(...args: any[]): any;
        setPersistentAttributes(...args: any[]): any;
        setSVG(svg: any, duration: any): any;
        static extend: any;
        static inject: any;
    }
    class Selection {
        constructor(...args: any[]);
        add(figure: any): any;
        clear(): any;
        contains(figure: any, checkDescendant: any): any;
        each(func: any, reverse: any): any;
        getAll(expand: any): any;
        getPrimary(): any;
        getSize(): any;
        init(): void;
        remove(figure: any): any;
        setPrimary(figure: any): any;
        static extend: any;
        static inject: any;
    }
    class SetFigure {
        constructor(...args: any[]);
        applyAlpha(): void;
        applyTransformation(): any;
        createSet(): any;
        createShapeElement(): any;
        getTopLevelShapeElement(): any;
        init(...args: any[]): any;
        repaint(...args: any[]): any;
        setCanvas(...args: any[]): any;
        setCssClass(...args: any[]): any;
        setVisible(...args: any[]): any;
        toBack(figure: any): any;
        toFront(figure: any): any;
        static extend: any;
        static inject: any;
    }
    class VectorFigure {
        constructor(...args: any[]);
        getBackgroundColor(): any;
        getColor(): any;
        getDashArray(): any;
        getPersistentAttributes(...args: any[]): any;
        getRadius(): any;
        getStroke(): any;
        init(...args: any[]): any;
        repaint(...args: any[]): any;
        setBackgroundColor(color: any): any;
        setColor(color: any): any;
        setDashArray(dashPattern: any): any;
        setGlow(flag: any): any;
        setPersistentAttributes(...args: any[]): any;
        setRadius(radius: any): any;
        setStroke(w: any): any;
        static extend: any;
        static inject: any;
    }
    const Configuration: {
        factory: {
            createConnection: any;
            createHybridPort: any;
            createInputPort: any;
            createOutputPort: any;
            createResizeHandle: any;
        };
        i18n: {
            command: {
                addShape: string;
                addVertex: string;
                assignShape: string;
                changeAttributes: string;
                collection: string;
                connectPorts: string;
                deleteShape: string;
                deleteVertex: string;
                groupShapes: string;
                move: string;
                moveLine: string;
                moveShape: string;
                moveVertex: string;
                moveVertices: string;
                resizeShape: string;
                rotateShape: string;
                ungroupShapes: string;
            };
            dialog: {
                filenamePrompt: string;
            };
            menu: {
                addSegment: string;
                deleteSegment: string;
            };
        };
        version: string;
    };
    // Circular reference from draw2d.Connection.DROP_FILTER.draw2d
    const Connection: any;
    const SnapToHelper: {
        CENTER_H: number;
        CENTER_V: number;
        EAST: number;
        EAST_WEST: number;
        NORTH: number;
        NORTH_EAST: number;
        NORTH_SOUTH: number;
        NORTH_WEST: number;
        NSEW: number;
        SOUTH: number;
        SOUTH_EAST: number;
        SOUTH_WEST: number;
        WEST: number;
    };
    const decoration: {
        connection: {
            ArrowDecorator: any;
            BarDecorator: any;
            CircleDecorator: any;
            Decorator: any;
            DiamondDecorator: any;
        };
    };
    const isTouchDevice: boolean;
    const layout: {
        anchor: {
            CenterEdgeConnectionAnchor: any;
            ChopboxConnectionAnchor: any;
            ConnectionAnchor: any;
            FanConnectionAnchor: any;
            ShortesPathConnectionAnchor: any;
        };
        connection: {
            CircuitConnectionRouter: any;
            ConnectionRouter: any;
            DirectRouter: any;
            FanConnectionRouter: any;
            InteractiveManhattanConnectionRouter: any;
            ManhattanBridgedConnectionRouter: any;
            ManhattanConnectionRouter: any;
            MazeConnectionRouter: any;
            MuteableManhattanConnectionRouter: any;
            RubberbandRouter: any;
            SketchConnectionRouter: any;
            SplineConnectionRouter: any;
            VertexRouter: any;
        };
        locator: {
            BottomLocator: any;
            CenterLocator: any;
            ConnectionLocator: any;
            DraggableLocator: any;
            InputPortLocator: any;
            LeftLocator: any;
            Locator: any;
            ManhattanMidpointLocator: any;
            OutputPortLocator: any;
            ParallelMidpointLocator: any;
            PolylineMidpointLocator: any;
            PortLocator: any;
            RightLocator: any;
            SmartDraggableLocator: any;
            TopLocator: any;
            XYAbsPortLocator: any;
            XYRelPortLocator: any;
        };
        mesh: {
            ExplodeLayouter: any;
            MeshLayouter: any;
            ProposedMeshChange: any;
        };
    };
    const shape: {
        analog: {
            OpAmp: any;
            ResistorBridge: any;
            ResistorVertical: any;
            VoltageSupplyHorizontal: any;
            VoltageSupplyVertical: any;
        };
        arrow: {
            CalligrapherArrowDownLeft: any;
            CalligrapherArrowLeft: any;
        };
        basic: {
            Arc: any;
            Circle: any;
            Diamond: any;
            GhostVertexResizeHandle: any;
            Image: any;
            Label: any;
            Line: any;
            LineEndResizeHandle: any;
            LineResizeHandle: any;
            LineStartResizeHandle: any;
            Oval: any;
            PolyLine: any;
            Polygon: any;
            Rectangle: any;
            Text: any;
            VertexResizeHandle: any;
        };
        composite: {
            Composite: any;
            Group: any;
            Jailhouse: any;
            Raft: any;
            StrongComposite: any;
            WeakComposite: any;
        };
        diagram: {
            Diagram: any;
            Pie: any;
            Sparkline: any;
        };
        dimetric: {
            Rectangle: any;
        };
        flowchart: {
            Document: any;
        };
        icon: {
            Acw: any;
            Alarm: any;
            Anonymous: any;
            Apple: any;
            Apps: any;
            ArrowDown: any;
            ArrowLeft: any;
            ArrowLeft2: any;
            ArrowRight: any;
            ArrowRight2: any;
            ArrowUp: any;
            Aumade: any;
            BarChart: any;
            BioHazard: any;
            Book: any;
            Bookmark: any;
            Books: any;
            Bubble: any;
            Bug: any;
            Calendar: any;
            Cart: any;
            Ccw: any;
            Chat: any;
            Check: any;
            Chrome: any;
            Clip: any;
            Clock: any;
            Cloud: any;
            Cloud2: any;
            CloudDown: any;
            CloudUp: any;
            Cloudy: any;
            Code: any;
            CodeTalk: any;
            CommandLine: any;
            Connect: any;
            Contract: any;
            Crop: any;
            Cross: any;
            Cube: any;
            Customer: any;
            Db: any;
            Detour: any;
            Diagram: any;
            Disconnect: any;
            DockBottom: any;
            DockLeft: any;
            DockRight: any;
            DockTop: any;
            Download: any;
            Dry: any;
            Employee: any;
            End: any;
            Ethernet: any;
            Exchange: any;
            Expand: any;
            Export: any;
            Fave: any;
            Feed: any;
            Ff: any;
            Firefox: any;
            Flag: any;
            Flickr: any;
            Folder: any;
            Font: any;
            Fork: any;
            ForkAlt: any;
            FullCube: any;
            Future: any;
            GRaphael: any;
            Gear: any;
            Gear2: any;
            GitHub: any;
            GitHubAlt: any;
            Glasses: any;
            Globe: any;
            GlobeAlt: any;
            GlobeAlt2: any;
            Hail: any;
            Hammer: any;
            HammerAndScrewDriver: any;
            HangUp: any;
            Help: any;
            History: any;
            Home: any;
            IMac: any;
            Icon: any;
            Icons: any;
            Ie: any;
            Ie9: any;
            Import: any;
            InkScape: any;
            Ipad: any;
            Iphone: any;
            JQuery: any;
            Jigsaw: any;
            Key: any;
            Lab: any;
            Lamp: any;
            Lamp_alt: any;
            Landing: any;
            Landscape1: any;
            Landscape2: any;
            LineChart: any;
            Link: any;
            LinkedIn: any;
            Linux: any;
            List: any;
            Location: any;
            Lock: any;
            Locked: any;
            Magic: any;
            Magnet: any;
            Mail: any;
            Man: any;
            Merge: any;
            Mic: any;
            MicMute: any;
            Minus: any;
            NewWindow: any;
            No: any;
            NoMagnet: any;
            NodeJs: any;
            Notebook: any;
            Noview: any;
            Opera: any;
            Package: any;
            Page: any;
            Page2: any;
            Pallete: any;
            Palm: any;
            Paper: any;
            Parent: any;
            Pc: any;
            Pen: any;
            Pensil: any;
            People: any;
            Phone: any;
            Photo: any;
            Picker: any;
            Picture: any;
            PieChart: any;
            Plane: any;
            Plugin: any;
            Plus: any;
            Power: any;
            Ppt: any;
            Printer: any;
            Quote: any;
            Rain: any;
            Raphael: any;
            ReflectH: any;
            ReflectV: any;
            Refresh: any;
            Resize2: any;
            Rotate: any;
            Ruler: any;
            Run: any;
            Rw: any;
            Safari: any;
            ScrewDriver: any;
            Search: any;
            Sencha: any;
            Settings: any;
            SettingsAlt: any;
            Shuffle: any;
            Skull: any;
            Skype: any;
            SlideShare: any;
            Smile: any;
            Smile2: any;
            Snow: any;
            Split: any;
            Star: any;
            Star2: any;
            Star2Off: any;
            Star3: any;
            Star3Off: any;
            StarOff: any;
            Start: any;
            Sticker: any;
            Stop: any;
            StopWatch: any;
            Sun: any;
            Svg: any;
            TShirt: any;
            Tag: any;
            TakeOff: any;
            Talke: any;
            Talkq: any;
            Thunder: any;
            Trash: any;
            Twitter: any;
            TwitterBird: any;
            Umbrella: any;
            Undo: any;
            Unlock: any;
            Usb: any;
            User: any;
            Users: any;
            Video: any;
            View: any;
            Vim: any;
            Volume0: any;
            Volume1: any;
            Volume2: any;
            Volume3: any;
            Warning: any;
            WheelChair: any;
            Windows: any;
            Woman: any;
            Wrench: any;
            Wrench2: any;
            Wrench3: any;
            ZoomIn: any;
            ZoomOut: any;
        };
        layout: {
            FlexGridLayout: any;
            HorizontalLayout: any;
            Layout: any;
            StackLayout: any;
            TableLayout: any;
            VerticalLayout: any;
        };
        node: {
            Between: any;
            End: any;
            Fulcrum: any;
            HorizontalBus: any;
            Hub: any;
            Node: any;
            Start: any;
            VerticalBus: any;
        };
        note: {
            PostIt: any;
        };
        pert: {
            Activity: any;
            Start: any;
        };
        state: {
            Connection: any;
            End: any;
            Start: any;
            State: any;
        };
        widget: {
            Slider: any;
            Widget: any;
        };
    };
    const storage: {
    };
    namespace command {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const Command: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandAdd: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandAddVertex: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandAssignFigure: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandAttr: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandBoundingBox: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandCollection: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandConnect: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandDelete: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandDeleteGroup: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandGroup: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandMove: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandMoveConnection: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandMoveLine: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandMoveVertex: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandMoveVertices: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandReconnect: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandRemoveVertex: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandReplaceVertices: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandResize: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandRotate: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandStack: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandStackEvent: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandStackEventListener: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandType: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.command
        const CommandUngroup: any;
    }
    namespace geo {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const Line: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const Point: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const PositionConstants: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const Ray: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const Rectangle: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.geo
        const Util: any;
    }
    namespace io {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.io
        const Reader: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.io
        const Writer: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.io
        const json: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.io
        const png: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.io
        const svg: any;
    }
    namespace policy {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const EditPolicy: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const canvas: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const connection: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const figure: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const line: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.policy
        const port: any;
    }
    namespace ui {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.ui
        const LabelEditor: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.ui
        const LabelInplaceEditor: any;
    }
    namespace util {
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const ArrayList: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const Base64: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const Color: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const JSON: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const UUID: any;
        // Too-deep object hierarchy from draw2d.Connection.DROP_FILTER.draw2d.util
        const spline: any;
    }
}

