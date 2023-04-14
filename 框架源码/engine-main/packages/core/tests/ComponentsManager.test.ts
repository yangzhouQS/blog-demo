// @ts-nocheck
import { WebGLEngine } from "../../rhi-webgl/src";
import { Camera } from "../src/Camera";
import { Engine, Entity, Renderer, Script } from "../src/index";
import { RenderContext } from "../src/RenderPipeline/RenderContext";
const canvasDOM = document.createElement("canvas");

describe("ComponentsManager", () => {
  let engine: WebGLEngine = new WebGLEngine(canvasDOM);
  let scene;
  let camera: Camera;
  let rootNode: Entity;
  beforeEach(() => {
    scene = engine.sceneManager.activeScene;
    rootNode = engine.sceneManager.activeScene.createRootEntity();
    camera = rootNode.addComponent(Camera);
    engine.sceneManager.activeScene = scene;
  });

  describe("Component", () => {
    class TestComponent extends Script {
      onUpdate() {}
    }
    it("onUpdate", () => {
      const entity = new Entity(engine, "entity");
      entity.parent = scene.getRootEntity();
      TestComponent.prototype.onUpdate = jest.fn();
      const component = entity.addComponent(TestComponent);
      engine.update();
      engine.update();
      expect(component.onUpdate).toHaveBeenCalledTimes(2);
    });
    // TODO 这条没过有问题
    // it("inActive", () => {
    //   const entity = new Entity(engine, "entity");
    //   entity.parent = scene.getRootEntity();
    //   TestComponent.prototype.onUpdate = jest.fn();
    //   const component = entity.addComponent(TestComponent);
    //   entity.isActive = false;
    //   engine.update();
    //   engine.update();
    //   expect(component.onUpdate).toHaveBeenCalledTimes(0);
    // });
  });

  describe("Renderer", () => {
    it("onUpdate", () => {
      class TestComponent extends Renderer {
        update() {}
        _render() {}
      }
      const entity = new Entity(engine, "entity");
      entity.parent = scene.getRootEntity();
      TestComponent.prototype.update = jest.fn();
      const component = entity.addComponent(TestComponent);
      engine._componentsManager.callScriptOnStart();
      engine._componentsManager.callRendererOnUpdate(16.7);
      engine._componentsManager.callScriptOnStart();
      engine._componentsManager.callRendererOnUpdate(16.7);
      expect(component.update).toHaveBeenCalledTimes(2);
    });

    it("render", () => {
      class TestComponent extends Renderer {
        update() {}
        _render() {}
      }
      const entity = new Entity(engine, "entity");
      entity.parent = scene.getRootEntity();
      TestComponent.prototype._render = jest.fn();
      const component = entity.addComponent(TestComponent);
      engine._renderContext._camera = camera;
      engine._componentsManager.callScriptOnStart();
      engine._componentsManager.callRender(engine._renderContext);
      engine._componentsManager.callScriptOnStart();
      engine._componentsManager.callRender(engine._renderContext);
      expect(component._render).toHaveBeenCalledTimes(2);
    });

    it("inActive", () => {
      class TestComponent extends Renderer {
        update() {}
        _render() {}
      }
      const entity = new Entity(engine, "entity");
      entity.parent = scene.getRootEntity();
      TestComponent.prototype.update = jest.fn();
      TestComponent.prototype._render = jest.fn();
      const component = entity.addComponent(TestComponent);
      entity.isActive = false;
      engine._componentsManager.callRendererOnUpdate(16.7);
      engine._renderContext._camera = camera;
      engine._componentsManager.callRender(engine._renderContext);
      expect(component.update).toHaveBeenCalledTimes(0);
      expect(component._render).toHaveBeenCalledTimes(0);
    });
  });
});
