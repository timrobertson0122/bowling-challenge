describe("Frame", function() {
  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  describe('playing', function(){

    it("registers a gutter ball", function() {
      frame.registerGo(0);
      expect(frame.remainingPins()).toEqual(10); 
    });

    it("registers a successful roll", function(){
      frame.registerGo(5);
      expect(frame.remainingPins()).toEqual(5);
    });

    it("can register 2 rolls", function(){
      frame.registerGo(3);
      frame.registerGo(4);
      expect(frame.remainingPins()).toEqual(3);
    });

    it("can register a strike", function(){
      frame.registerGo(10);
      expect(frame.isStrike()).toEqual(true);
    });

    it("knows when a spare has been scored", function(){
      frame.registerGo(1);
      frame.registerGo(9);
      expect(frame.isSpare()).toEqual(true);
    });

  });

  describe('knows when it is over', function() {

    it("after 2 rolls", function(){
      frame.registerGo(4);
      frame.registerGo(5);
      expect(frame.isOver()).toEqual(true);
    });

    it("after a strike", function(){
      frame.registerGo(10);
      expect(frame.isOver()).toEqual(true);
    });

    it("knows when it is not over after less than 2 rolls", function(){
      expect(frame.isOver()).toEqual(false);
    });

    it("won't allow another roll after two rolls", function(){
      frame.registerGo(2);
      frame.registerGo(4);
      expect(function() { frame.registerGo(0) }).toThrow("Frame is over");
    });

    it("won't allow another roll after a strike", function(){
      frame.registerGo(10);
      expect(function() { frame.registerGo(0) }).toThrow("Frame is over");
    });

  });

  describe("scoring", function(){

    it("knows the score from roll 1", function(){
      frame.registerGo(3);
      expect(frame.rolls[0]).toEqual(3);
    });

    it("knows the score from roll 2", function(){
      frame.registerGo(3);
      frame.registerGo(4);
      expect(frame.rolls[1]).toEqual(4);
    });

    it("knows the total frame score", function(){
      frame.registerGo(3);
      frame.registerGo(4);
      expect(frame.total()).toEqual(7);
    });

  });

});
