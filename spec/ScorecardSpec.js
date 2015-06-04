describe("Scorecard", function() {
  var scorecard;
  var frameDouble;
  var spareDouble;

  beforeEach(function() {
    scorecard = new Scorecard();
    frameDouble = { 
      rolls: [2,2],
      total : function() { return 4 },
      isSpare : function() { return false }
    }
    spareDouble = { 
      rolls: [4,6],
      total : function() { return 10},
      isSpare : function() { return true }
    }
  });

    it("can take a frame", function(){
      scorecard.addFrame({});
      expect(scorecard.frames).toEqual([{}]);
    });

    it("can calculate a total of a series of frames", function(){
      scorecard.addFrame(frameDouble);
      scorecard.addFrame(frameDouble);
      expect(scorecard.total()).toEqual(8);
    });

    it("knows the score of a particular ball in a particular frame", function() {
      frameDouble.rolls = [4,6]
      scorecard.addFrame(frameDouble);
      expect(scorecard.getRollScore(0, 1)).toEqual(6);
    });

    it("accumulates bonus points from spare frames", function(){
      scorecard.addFrame(spareDouble);
      scorecard.addFrame(frameDouble);
      expect(scorecard.total()).toEqual(16);
    });


});